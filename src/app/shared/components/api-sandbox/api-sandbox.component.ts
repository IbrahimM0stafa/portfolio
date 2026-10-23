import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface ApiEndpointPreset {
  id: string;
  name: string;
  method: 'GET' | 'POST';
  path: string;
  category: string;
  description: string;
  requestBody?: string;
  simulatedResponse: {
    status: number;
    statusText: string;
    durationMs: number;
    data: any;
  };
}

@Component({
  selector: 'app-api-sandbox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="rounded-2xl border border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-card shadow-card overflow-hidden transition-colors">
      <!-- Header -->
      <div class="p-5 sm:p-6 border-b border-neutral-200 dark:border-dark-border bg-neutral-50/70 dark:bg-dark-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
              <app-icon name="terminal" [size]="12"></app-icon>
              Production REST API &amp; Terminal Sandbox
            </span>
            <span class="text-xs font-mono text-neutral-500 dark:text-neutral-400">Petites Spring Boot 3.5 (19 Modules)</span>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Real Endpoint &amp; Transaction Simulation
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
            Simulate live requests against Petites verified controller contracts (CartService, ChatbotService, OrderService).
          </p>
        </div>

        <!-- Presets quick dropdown / tabs -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <button
            *ngFor="let preset of presets"
            type="button"
            (click)="selectPreset(preset.id)"
            class="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
            [ngClass]="activePresetId() === preset.id ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold shadow-sm' : 'bg-neutral-200/60 dark:bg-dark-surface text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300/70 dark:hover:bg-neutral-800'"
          >
            {{ preset.name }}
          </button>
        </div>
      </div>

      <!-- Sandbox Body -->
      <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        <!-- Request Column (5 cols) -->
        <div class="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-dark-border bg-neutral-50/40 dark:bg-[#0c0d12] flex flex-col justify-between">
          <div class="space-y-4">
            <!-- URL Bar -->
            <div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold block mb-1.5">
                Target Endpoint
              </span>
              <div class="flex items-center gap-2 p-1.5 rounded-xl border border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-card font-mono text-xs">
                <span
                  class="px-2 py-0.5 rounded font-bold text-[11px]"
                  [ngClass]="activePreset().method === 'POST' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'"
                >
                  {{ activePreset().method }}
                </span>
                <span class="text-neutral-800 dark:text-neutral-200 truncate flex-1">
                  {{ activePreset().path }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="p-3 rounded-xl bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <strong class="font-semibold text-neutral-900 dark:text-white block mb-0.5">Contract &amp; Behavior:</strong>
              {{ activePreset().description }}
            </div>

            <!-- Request Body -->
            <div *ngIf="activePreset().requestBody">
              <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold mb-1.5">
                <span>Request Payload (application/json)</span>
                <span>DTO Verified</span>
              </div>
              <pre class="p-3 rounded-xl bg-[#0e1017] text-neutral-200 font-mono text-[11px] leading-relaxed border border-neutral-800 overflow-x-auto max-h-56"><code>{{ activePreset().requestBody }}</code></pre>
            </div>
          </div>

          <!-- Send Request CTA -->
          <div class="mt-4 pt-3 border-t border-neutral-200 dark:border-dark-border flex items-center justify-between">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Status: Verified Contract</span>
            <button
              type="button"
              (click)="executeRequest()"
              [disabled]="isExecuting()"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm hover:shadow-glow-emerald transition-all disabled:opacity-50"
            >
              <app-icon *ngIf="!isExecuting()" name="play" [size]="12"></app-icon>
              <span *ngIf="isExecuting()" class="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              <span>{{ isExecuting() ? 'Executing Transaction...' : 'Send Request' }}</span>
            </button>
          </div>
        </div>

        <!-- Response Column (7 cols) -->
        <div class="lg:col-span-7 p-5 bg-[#0a0c10] text-neutral-200 font-mono flex flex-col justify-between">
          <div>
            <!-- Response Meta Bar -->
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1.5 px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {{ lastResponse()?.status ?? activePreset().simulatedResponse.status }} {{ lastResponse()?.statusText ?? activePreset().simulatedResponse.statusText }}
                </span>
                <span class="text-neutral-400 text-[11px]">
                  Time: <span class="text-neutral-200 font-semibold">{{ currentLatency() }}ms</span>
                </span>
                <span class="text-neutral-400 text-[11px] hidden sm:inline">
                  Size: <span class="text-neutral-200 font-semibold">{{ responseSize() }}</span>
                </span>
              </div>
              <span class="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                HTTP/2 JSON
              </span>
            </div>

            <!-- Response Code Block -->
            <div class="relative">
              <pre class="p-3.5 rounded-xl bg-[#06070a] text-neutral-200 text-[11px] leading-relaxed border border-neutral-800/90 overflow-x-auto max-h-[380px]"><code class="text-emerald-300">{{ formattedResponseJson() }}</code></pre>
            </div>
          </div>

          <!-- Terminal Status Footer -->
          <div class="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Spring Boot 3.5.14 &bull; PostgreSQL 16 &bull; Gemini 3.5/3.6 Fallback
            </span>
            <span class="text-neutral-400">Isolation: &#64;Transactional</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ApiSandboxComponent {
  activePresetId = signal<string>('checkout');
  isExecuting = signal<boolean>(false);
  lastResponse = signal<any>(null);
  currentLatency = signal<number>(45);

  presets: ApiEndpointPreset[] = [
    {
      id: 'checkout',
      name: 'POST /api/checkout',
      method: 'POST',
      path: '/api/checkout',
      category: 'Fulfillment Engine',
      description:
        'Executes atomic checkout via CheckoutController & CartService. Partitions cart items by DeliveryMode (INSTANT vs SCHEDULED) into isolated Order records, reserves inventory and scheduled date capacity, applies coupons, and returns a consolidated CheckoutResponse.',
      requestBody: `{
  "customerName": "Laila Mahmoud",
  "customerPhone": "+201012345678",
  "orderType": "DELIVERY",
  "deliveryCity": "Alexandria",
  "deliveryArea": "Smouha",
  "deliveryStreet": "Victor Emanuel St.",
  "deliveryBuilding": "Building 14, Apt 6",
  "notes": "Please call before arrival",
  "couponCode": "WELCOME10",
  "scheduledDate": "2026-10-25"
}`,
      simulatedResponse: {
        status: 200,
        statusText: 'OK',
        durationMs: 45,
        data: {
          cartId: 'cart_89a24cf1',
          totalAmount: 1235.00,
          orders: [
            {
              orderId: 'ord_9182a',
              orderNumber: 'PET-261021-001',
              deliveryMode: 'INSTANT',
              orderType: 'DELIVERY',
              status: 'PENDING',
              paymentMethod: 'INSTAPAY',
              subtotal: 450.00,
              deliveryFee: 50.00,
              discountAmount: 45.00,
              totalAmount: 455.00,
              customerName: 'Laila Mahmoud',
              customerPhone: '+201012345678',
              scheduledDate: null,
              notes: 'Please call before arrival',
              couponId: 'coup_welcome10',
              rewardApplied: false,
              isCourierDelivery: false,
              createdAt: '2026-10-21T03:30:15Z',
              items: [
                {
                  id: 'item_1',
                  productId: 'prod_macarons',
                  productName: 'Parisian Macarons (12pcs)',
                  quantity: 3,
                  unitPrice: 150.00,
                  deliveryMode: 'INSTANT',
                  lineTotal: 450.00
                }
              ]
            },
            {
              orderId: 'ord_9182b',
              orderNumber: 'PET-261021-002',
              deliveryMode: 'SCHEDULED',
              orderType: 'DELIVERY',
              status: 'PENDING',
              paymentMethod: 'INSTAPAY',
              subtotal: 780.00,
              deliveryFee: 0.00,
              discountAmount: 0.00,
              totalAmount: 780.00,
              customerName: 'Laila Mahmoud',
              customerPhone: '+201012345678',
              scheduledDate: '2026-10-25',
              notes: 'Please call before arrival',
              couponId: null,
              rewardApplied: false,
              isCourierDelivery: false,
              createdAt: '2026-10-21T03:30:15Z',
              items: [
                {
                  id: 'item_2',
                  productId: 'prod_belgian_cake',
                  productName: 'Belgian Chocolate Hazelnut Cake',
                  quantity: 1,
                  unitPrice: 780.00,
                  deliveryMode: 'SCHEDULED',
                  lineTotal: 780.00
                }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'chat',
      name: 'POST /api/chat',
      method: 'POST',
      path: '/api/chat',
      category: 'AI Concierge',
      description:
        'Invokes ChatbotController & ChatbotService. Queries Gemini 3.5 Flash Lite -> Gemini 3.6 Flash -> OpenAI with real database product grounding via ChatbotToolsService, emitting typed ChatActionDto for cart manipulation.',
      requestBody: `{
  "messages": [
    {
      "role": "user",
      "content": "Do you have fresh macarons for delivery today? I want 2 boxes if available."
    }
  ]
}`,
      simulatedResponse: {
        status: 200,
        statusText: 'OK',
        durationMs: 72,
        data: {
          reply: "We have fresh Parisian Macarons (12pcs) ready in our kitchen display! 🥐 I've prepared 2 boxes for instant same-day delivery.",
          products: [
            {
              id: 'prod_macarons',
              name: 'Parisian Macarons (12pcs)',
              price: 150.00,
              fulfillmentMode: 'INSTANT',
              isAvailable: true
            }
          ],
          action: {
            type: 'ADD_TO_CART',
            productId: 'prod_macarons',
            productName: 'Parisian Macarons (12pcs)',
            quantity: 2,
            deliveryMode: 'INSTANT',
            price: 150.00,
            targetUrl: null
          },
          quickReplies: [
            '🛒 View Cart',
            '⚡ Instant Items',
            '💳 Checkout'
          ]
        }
      }
    },
    {
      id: 'order-tracking',
      name: 'GET /api/orders/{id}',
      method: 'GET',
      path: '/api/orders/ord_9182a',
      category: 'Order Tracking & WebSockets',
      description:
        'Fetches order state from OrderService and tracks 8-stage lifecycle (PENDING -> CONFIRMED -> IN_PREPARATION -> OUT_FOR_DELIVERY -> DELIVERED -> COMPLETED). Updates broadcast live via OrderWebSocketService.',
      requestBody: undefined,
      simulatedResponse: {
        status: 200,
        statusText: 'OK',
        durationMs: 25,
        data: {
          orderId: 'ord_9182a',
          orderNumber: 'PET-261021-001',
          deliveryMode: 'INSTANT',
          orderType: 'DELIVERY',
          status: 'IN_PREPARATION',
          paymentMethod: 'INSTAPAY',
          subtotal: 450.00,
          deliveryFee: 50.00,
          totalAmount: 455.00,
          customerName: 'Laila Mahmoud',
          customerPhone: '+201012345678',
          notes: 'Please call before arrival',
          createdAt: '2026-10-21T03:30:15Z',
          webSocketChannel: '/topic/orders/ord_9182a'
        }
      }
    }
  ];

  activePreset = () => this.presets.find(p => p.id === this.activePresetId()) ?? this.presets[0];

  selectPreset(id: string): void {
    this.activePresetId.set(id);
    this.lastResponse.set(null);
    this.currentLatency.set(this.activePreset().simulatedResponse.durationMs);
  }

  executeRequest(): void {
    this.isExecuting.set(true);
    const target = this.activePreset().simulatedResponse;
    const randomJitter = Math.floor(Math.random() * 16) - 8;
    const latency = Math.max(18, target.durationMs + randomJitter);

    setTimeout(() => {
      this.currentLatency.set(latency);
      this.lastResponse.set(target);
      this.isExecuting.set(false);
    }, 400);
  }

  formattedResponseJson(): string {
    const data = this.lastResponse()?.data ?? this.activePreset().simulatedResponse.data;
    return JSON.stringify(data, null, 2);
  }

  responseSize(): string {
    const str = this.formattedResponseJson();
    return `${(new Blob([str]).size / 1024).toFixed(1)} KB`;
  }
}
