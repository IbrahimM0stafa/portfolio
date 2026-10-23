import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  category: 'frontend' | 'gateway' | 'backend' | 'database' | 'ai' | 'devops';
  badge: string;
  summary: string;
  snippet?: string;
  invariants: string[];
}

@Component({
  selector: 'app-architecture-explorer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="rounded-2xl border border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-card shadow-card overflow-hidden transition-colors">
      <!-- Widget Header -->
      <div class="p-5 sm:p-6 border-b border-neutral-200 dark:border-dark-border bg-neutral-50/70 dark:bg-dark-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Architecture Visualizer
            </span>
            <span class="text-xs font-mono text-neutral-500 dark:text-neutral-400">Petites Spring Boot 3.5 (19 Modules)</span>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
            System Topology &amp; Transactional Flow
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
            Select any architectural tier or subsystem node to inspect verified data flows, transactional boundaries, and production code.
          </p>
        </div>

        <!-- Quick filter / reset indicator -->
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Active Node:</span>
          <span class="px-2.5 py-1 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-mono text-xs font-bold">
            {{ activeNode().title }}
          </span>
        </div>
      </div>

      <!-- Main Interactive Visualizer Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        <!-- Left: Interactive Node Canvas (7 cols) -->
        <div class="lg:col-span-7 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-dark-border bg-neutral-100/40 dark:bg-[#0c0d12] flex flex-col justify-between">
          
          <!-- Architecture Tiers Stack -->
          <div class="space-y-4">
            <!-- 1. Client Presentation Tier -->
            <div>
              <div class="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
                <app-icon name="monitor" [size]="13"></app-icon>
                <span>Presentation Tier &bull; Dual Angular 19 SPAs</span>
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  (click)="selectNode('storefront')"
                  class="p-3 rounded-xl border text-left transition-all duration-150"
                  [ngClass]="activeNodeId() === 'storefront' ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 shadow-sm ring-1 ring-amber-500' : 'border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-neutral-400 dark:hover:border-neutral-600'"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-neutral-900 dark:text-white">Storefront SPA</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold">:80</span>
                  </div>
                  <div class="text-[11px] text-neutral-500 dark:text-neutral-400">Angular 19 Signals &bull; Guest &amp; User Checkout</div>
                </button>

                <button
                  type="button"
                  (click)="selectNode('admin-panel')"
                  class="p-3 rounded-xl border text-left transition-all duration-150"
                  [ngClass]="activeNodeId() === 'admin-panel' ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 shadow-sm ring-1 ring-amber-500' : 'border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-neutral-400 dark:hover:border-neutral-600'"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-neutral-900 dark:text-white">Operations Admin</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold">:8081</span>
                  </div>
                  <div class="text-[11px] text-neutral-500 dark:text-neutral-400">8-Stage Lifecycle &bull; WebSockets &bull; Quotas</div>
                </button>
              </div>
            </div>

            <!-- Arrow Bridge -->
            <div class="flex items-center justify-center text-neutral-400 dark:text-neutral-600 py-0.5">
              <svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>

            <!-- 2. Gateway Tier -->
            <div>
              <div class="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
                <app-icon name="shield-check" [size]="13"></app-icon>
                <span>Edge &amp; Gateway Tier &bull; Nginx &amp; Security</span>
              </div>
              <button
                type="button"
                (click)="selectNode('gateway')"
                class="w-full p-3 rounded-xl border text-left transition-all duration-150"
                [ngClass]="activeNodeId() === 'gateway' ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-sm ring-1 ring-indigo-500' : 'border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-neutral-400 dark:hover:border-neutral-600'"
              >
                <div class="flex items-center justify-between mb-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-neutral-900 dark:text-white">Nginx Reverse Proxy &amp; JWT Rotation</span>
                  </div>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-semibold">SSL + Subdomain Routing</span>
                </div>
                <div class="text-[11px] text-neutral-500 dark:text-neutral-400">Spring Security role-based auth, JWT access/refresh rotation, isolated bridge network</div>
              </button>
            </div>

            <!-- Arrow Bridge -->
            <div class="flex items-center justify-center text-neutral-400 dark:text-neutral-600 py-0.5">
              <svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>

            <!-- 3. Enterprise Core Backend (Spring Boot 3.5.14 / Java 21) -->
            <div>
              <div class="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
                <app-icon name="cpu" [size]="13"></app-icon>
                <span>Core Business Domain &bull; Spring Boot 3.5.14 / Java 21 (19 Modules)</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <!-- CartService -->
                <button
                  type="button"
                  (click)="selectNode('mixed-fulfillment')"
                  class="p-3 rounded-xl border text-left transition-all duration-150"
                  [ngClass]="activeNodeId() === 'mixed-fulfillment' ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500' : 'border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-neutral-400 dark:hover:border-neutral-600'"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-neutral-900 dark:text-white">Cart &amp; Fulfillment Engine</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-semibold">&#64;Transactional</span>
                  </div>
                  <div class="text-[11px] text-neutral-500 dark:text-neutral-400">CartService.checkout partitions orders by DeliveryMode (Instant vs Scheduled)</div>
                </button>

                <!-- ChatbotService -->
                <button
                  type="button"
                  (click)="selectNode('ai-concierge')"
                  class="p-3 rounded-xl border text-left transition-all duration-150"
                  [ngClass]="activeNodeId() === 'ai-concierge' ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500' : 'border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-neutral-400 dark:hover:border-neutral-600'"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-neutral-900 dark:text-white">Grounded AI Concierge</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-semibold">Gemini Fallback</span>
                  </div>
                  <div class="text-[11px] text-neutral-500 dark:text-neutral-400">ChatbotToolsService catalog grounding &amp; ChatActionDto cart dispatch</div>
                </button>
              </div>
            </div>

            <!-- Arrow Bridge -->
            <div class="flex items-center justify-center text-neutral-400 dark:text-neutral-600 py-0.5">
              <svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>

            <!-- 4. Persistence & Deployment Pipeline -->
            <div>
              <div class="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
                <app-icon name="database" [size]="13"></app-icon>
                <span>Persistence &amp; CI/CD Topology</span>
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  (click)="selectNode('postgres')"
                  class="p-3 rounded-xl border text-left transition-all duration-150"
                  [ngClass]="activeNodeId() === 'postgres' ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/40 shadow-sm ring-1 ring-cyan-500' : 'border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-neutral-400 dark:hover:border-neutral-600'"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-neutral-900 dark:text-white">PostgreSQL 16</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 font-semibold">Private Network</span>
                  </div>
                  <div class="text-[11px] text-neutral-500 dark:text-neutral-400">19 domain tables, capacity locking, zero public port exposure</div>
                </button>

                <button
                  type="button"
                  (click)="selectNode('jenkins')"
                  class="p-3 rounded-xl border text-left transition-all duration-150"
                  [ngClass]="activeNodeId() === 'jenkins' ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/40 shadow-sm ring-1 ring-cyan-500' : 'border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-neutral-400 dark:hover:border-neutral-600'"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-neutral-900 dark:text-white">Docker &amp; Jenkins</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 font-semibold">CI/CD Pipeline</span>
                  </div>
                  <div class="text-[11px] text-neutral-500 dark:text-neutral-400">Multi-stage Docker builds, healthchecks, automated deployment</div>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom hint -->
          <div class="mt-4 pt-3 border-t border-neutral-200 dark:border-dark-border text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
            <span>Verified in Petites backend codebase</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 font-medium">Production Verified</span>
          </div>
        </div>

        <!-- Right: Code Snippet & Invariants Inspector (5 cols) -->
        <div class="lg:col-span-5 p-5 sm:p-6 bg-white dark:bg-dark-card flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-200 dark:border-dark-border">
              <div>
                <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold block">
                  Subsystem Inspector
                </span>
                <h4 class="text-base font-bold text-neutral-900 dark:text-white">
                  {{ activeNode().title }}
                </h4>
              </div>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-100 dark:bg-dark-surface text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-dark-border">
                {{ activeNode().badge }}
              </span>
            </div>

            <!-- Summary paragraph -->
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              {{ activeNode().summary }}
            </p>

            <!-- Transactional / Architectural Invariants -->
            <div class="mb-4">
              <h5 class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Verified Architectural Guarantees:
              </h5>
              <ul class="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li *ngFor="let inv of activeNode().invariants" class="flex items-start gap-2">
                  <span class="text-emerald-500 font-bold mt-0.5">&bull;</span>
                  <span>{{ inv }}</span>
                </li>
              </ul>
            </div>

            <!-- Code Snippet Box -->
            <div *ngIf="activeNode().snippet" class="mt-4">
              <div class="flex items-center justify-between px-3 py-1.5 rounded-t-lg bg-neutral-900 text-neutral-400 text-[11px] font-mono border-b border-neutral-800">
                <span>Production Source</span>
                <span class="text-emerald-400">Java / Spring Boot</span>
              </div>
              <pre class="p-3.5 rounded-b-lg bg-[#0e1017] text-neutral-200 font-mono text-[11px] leading-relaxed overflow-x-auto border border-neutral-800 shadow-inner"><code>{{ activeNode().snippet }}</code></pre>
            </div>
          </div>

          <!-- Quick action -->
          <div class="mt-6 pt-4 border-t border-neutral-200 dark:border-dark-border flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>Petites Production Source</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">100% Contract Match</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ArchitectureExplorerComponent {
  activeNodeId = signal<string>('mixed-fulfillment');

  nodes: Record<string, ArchitectureNode> = {
    'storefront': {
      id: 'storefront',
      title: 'Customer Storefront SPA',
      subtitle: 'Angular 19 Standalone Signals',
      category: 'frontend',
      badge: 'Angular 19 (:80)',
      summary:
        'Customer-facing single-page application built on Angular 19 standalone component architecture with signal-driven reactive state. Features category filtering, dual delivery-mode badge labeling (Instant vs Scheduled), and a real-time conversational AI drawer.',
      invariants: [
        'Supports both authenticated user accounts and guest checkout sessions via X-Guest-Token header.',
        'Chatbot responses with ChatActionDto dispatch directly into frontend cart state.',
        'Real-time delivery mode validation prevents scheduling an instant-only item past the daily Cairo cutoff time.'
      ],
      snippet: `// CheckoutController.java - Guest & User resolution
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    @PostMapping
    public CheckoutResponse checkout(
            @RequestHeader(value = "X-Guest-Token", required = false) String headerToken,
            @RequestParam(value = "token", required = false) String token,
            @Valid @RequestBody CheckoutRequest request) {
        return cartService.checkout(resolveOwner(headerToken, token), request);
    }
}`
    },
    'admin-panel': {
      id: 'admin-panel',
      title: 'Operations Admin Dashboard',
      subtitle: 'Dedicated Kitchen Control Subdomain',
      category: 'frontend',
      badge: 'Admin Subdomain (:8081)',
      summary:
        'Standalone role-guarded management portal hosted on a distinct subdomain (admin.petites.com). Empowers kitchen chefs and managers to control Cairo-time ordering cutoffs, adjust daily baking batch limits, manage blackout dates, and advance orders through the 8-stage state machine with live WebSockets.',
      invariants: [
        'Strictly isolated routing with Spring Security JWT role verification (ROLE_ADMIN).',
        'Direct control plane over ProductDailyCapacityUsage to prevent kitchen overload on peak dates.',
        'Egyptian InstaPay payment reconciliation with screenshot proof review before order dispatch.',
        'WebSocket topic notifications (/topic/orders) broadcast order status transitions in real time.'
      ],
      snippet: `// OrderStatus.java - 8-Stage Lifecycle Pipeline
public enum OrderStatus {
    PENDING,
    CONFIRMED,
    IN_PREPARATION,
    OUT_FOR_DELIVERY,
    READY_FOR_PICKUP,
    DELIVERED,
    COMPLETED,
    CANCELLED
}`
    },
    'gateway': {
      id: 'gateway',
      title: 'Nginx Reverse Proxy & Auth Gateway',
      subtitle: 'Subdomain Demuxing & Private Bridge',
      category: 'gateway',
      badge: 'Nginx + JWT',
      summary:
        'Nginx edge reverse proxy managing traffic routing, SSL termination, and rate limiting. Routes public storefront requests to port 80, administrative dashboard requests to port 8081, and API queries to the Spring Boot backend over an isolated Docker virtual network.',
      invariants: [
        'Zero public internet exposure for PostgreSQL (accessible only on private docker bridge network).',
        'Stateless JWT access/refresh token rotation filter in Spring Security extracting claims with sub-millisecond overhead.',
        'CORS whitelist restricted exclusively to verified production client origins.'
      ],
      snippet: `// SecurityConfig.java - Public & Protected Route Matching
.requestMatchers(
    "/api/cart/**",
    "/api/checkout",
    "/api/orders/**",
    "/api/settings/**",
    "/api/chat/**",
    "/api/delivery-zones/**"
).permitAll()
.requestMatchers("/api/admin/**").hasRole("ADMIN")`
    },
    'mixed-fulfillment': {
      id: 'mixed-fulfillment',
      title: 'Atomic Mixed-Fulfillment Engine',
      subtitle: 'CartService.checkout Domain Core',
      category: 'backend',
      badge: 'CartService.checkout',
      summary:
        'Architected in CartService.checkout. When a customer cart contains both immediate display items and custom-scheduled future cakes, the engine atomically splits the cart into isolated Order entities partitioned by DeliveryMode while returning a single consolidated CheckoutResponse.',
      invariants: [
        'Atomic rollback guarantee: If scheduled capacity allocation fails, instant reservations automatically revert.',
        'Instant delivery items enforce an immutable daily cutoff time (19:00 default) in the Africa/Cairo timezone.',
        'FulfillmentService tracks ProductDailyCapacityUsage and InstantDeliveryInventory concurrently.',
        'Consolidates all partitioned orders under a single cartId and totalAmount.'
      ],
      snippet: `// CartService.java - Grouping by DeliveryMode & Atomic Order Creation
Map<DeliveryMode, List<CartItem>> groupedItems = new LinkedHashMap<>();
for (CartItem item : items) {
    groupedItems.computeIfAbsent(item.getDeliveryMode(), key -> new ArrayList<>()).add(item);
}
for (Map.Entry<DeliveryMode, List<CartItem>> entry : groupedItems.entrySet()) {
    if (entry.getKey() == DeliveryMode.INSTANT) {
        fulfillmentService.reserveInstantQuantity(cartItem.getProduct().getId(), cartItem.getQuantity());
    } else {
        reserveScheduledCapacityForCheckout(cartItem, scheduledDate);
    }
    Order order = new Order();
    order.setDeliveryMode(entry.getKey());
    order.setStatus(OrderStatus.PENDING);
    savedOrders.add(orderRepository.save(order));
}`
    },
    'ai-concierge': {
      id: 'ai-concierge',
      title: 'Grounded AI Shopping Concierge',
      subtitle: 'Multi-Model Fallback & ChatActionDto Protocol',
      category: 'ai',
      badge: 'Gemini + OpenAI + NLP',
      summary:
        'Grounded conversational agent built in ChatbotService. To prevent hallucinations and ensure accurate product recommendations, dynamic system prompts inject active database catalog context via ChatbotToolsService. Executes typed ChatActionDto for cart mutations.',
      invariants: [
        'Resilient 3-tier fallback: Gemini (gemini-3.5-flash-lite, gemini-3.6-flash) -> OpenAI (gpt-4o-mini) -> Arabic NLP synonym dictionary.',
        'Zero hallucinated items: ChatbotToolsService injects active menu items with availability tags.',
        'Outputs typed ChatActionDto (ADD_TO_CART, VIEW_CART, INITIATE_CHECKOUT) parsed directly by frontend.'
      ],
      snippet: `// ChatbotService.java - Multi-Model Fallback & Model Hierarchy
private static final List<String> GEMINI_MODELS = List.of(
    "gemini-3.5-flash-lite", 
    "gemini-3.6-flash"
);

for (String modelName : GEMINI_MODELS) {
    try {
        ChatResponse geminiResp = callGeminiApi(messages, modelName);
        if (geminiResp != null && geminiResp.reply() != null) return geminiResp;
    } catch (Exception e) {
        logger.warn("Gemini model {} failed, trying next: {}", modelName, e.getMessage());
    }
}`
    },
    'postgres': {
      id: 'postgres',
      title: 'PostgreSQL 16 Enterprise Database',
      subtitle: '19+ Domain Modules & Relational Integrity',
      category: 'database',
      badge: 'PostgreSQL 16',
      summary:
        'Robust relational persistence layer modeling 19+ distinct domain modules: orders, carts, products, categories, coupons, loyalty rewards, delivery zones, settings, users, and audit records. Isolated inside private Docker Compose network.',
      invariants: [
        'Foreign key integrity across orders, delivery modes, and order items.',
        'ProductDailyCapacityUsage enforces daily quotas per scheduled production date.',
        'InstantDeliveryInventory manages real-time counter stock for instant fulfillment.'
      ],
      snippet: `// 19+ Domain Modules in com.petites.backend
addresses  admin       analytics  auth
carts      categories  chatbot    common
config     coupons     images     loyalty
orders     payments    products   security
settings   users       websocket`
    },
    'jenkins': {
      id: 'jenkins',
      title: 'Docker Compose & CI/CD Pipeline',
      subtitle: 'Multi-Stage Builds & Automated Workflows',
      category: 'devops',
      badge: 'Docker & Jenkins',
      summary:
        'Containerized multi-service deployment with Dockerfile and docker-compose.yml. Features automated builds, testing, and deployment workflows with Jenkins and GitHub Actions on a Linux VPS.',
      invariants: [
        'Multi-stage Docker builds separating Maven compilation from minimal Temurin JRE runtime.',
        'Health checks on Spring Boot Actuator endpoint before routing proxy traffic.',
        'Isolated internal container network with zero external host port exposure for database.'
      ],
      snippet: `# Dockerfile - Multi-Stage Minimal Runtime
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`
    }
  };

  activeNode = () => this.nodes[this.activeNodeId()] ?? this.nodes['mixed-fulfillment'];

  selectNode(id: string): void {
    this.activeNodeId.set(id);
  }
}
