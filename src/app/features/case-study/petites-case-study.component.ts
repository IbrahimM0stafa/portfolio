import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-petites-case-study',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl p-6 sm:p-10 shadow-card my-12 transition-colors" id="petites-architecture">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-dark-border">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-200 dark:border-amber-800">
            Engineering Case Study &bull; Flagship Fullstack Architecture
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Petites: Full-Spectrum E-Commerce, Kitchen Operations &amp; AI Concierge
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-3xl">
            A comprehensive breakdown of an artisanal patisserie platform engineered with dual Angular 19 SPAs, Spring Boot 3.5, an atomic mixed-fulfillment domain model, a grounded Gemini AI concierge, and automated Jenkins CI/CD.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <a
            href="https://github.com/IbrahimM0stafa"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium hover:bg-neutral-800 dark:hover:bg-white focus-ring transition-colors"
          >
            <app-icon name="github" [size]="14"></app-icon>
            <span>View Source on GitHub</span>
          </a>
        </div>
      </div>

      <!-- Core Architectural 4-Pillar Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <!-- Pillar 1: Mixed Fulfillment Domain Core -->
        <div class="space-y-4 p-5 rounded-xl bg-neutral-50/80 dark:bg-dark-surface/60 border border-neutral-200 dark:border-dark-border flex flex-col justify-between">
          <div class="space-y-3">
            <h3 class="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              1. Atomic Mixed-Fulfillment &amp; Dual Inventory Core
            </h3>
            <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Standard e-commerce carts collapse all items into a single checkout record against a unified inventory counter. In an artisanal bakery, this triggers kitchen overbooking because goods operate under clashing operational rules:
            </p>
            <ul class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-2 pl-4 list-disc marker:text-amber-600">
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Instant Same-Day Delivery:</strong> Fresh pastries resting in kitchen display cases, tracked via <code class="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">InstantDeliveryInventory</code> and constrained by a strict Cairo-time cutoff (e.g. 19:00 PM).
              </li>
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Scheduled Artisanal Pre-Orders:</strong> Custom cakes and large brioche batches baked in limited daily quotas, tracked via <code class="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">ProductDailyCapacityUsage</code> on specific future production dates.
              </li>
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Logistics Flexibility:</strong> Seamlessly accommodates Home Delivery (<code class="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">DELIVERY</code>) vs In-Store Pickup (<code class="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">PICKUP</code>), alongside guest checkout sessions.
              </li>
            </ul>
          </div>
          <div class="p-3.5 rounded-lg bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed">
            <strong class="font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">Transactional Invariant:</strong>
            <code class="text-neutral-900 dark:text-white">CartService.checkout</code> groups cart items by <code class="text-neutral-900 dark:text-white">DeliveryMode</code> into a <code class="text-neutral-900 dark:text-white">Map&lt;DeliveryMode, List&lt;CartItem&gt;&gt;</code>. Both instant inventory and future quota reservations execute inside a single atomic <code class="text-emerald-600 dark:text-emerald-400 font-semibold">&#64;Transactional</code> boundary. If scheduled capacity fails, all instant reservations rollback automatically.
          </div>
        </div>

        <!-- Pillar 2: Grounded AI Concierge & Machine Action Protocol -->
        <div class="space-y-4 p-5 rounded-xl bg-neutral-50/80 dark:bg-dark-surface/60 border border-neutral-200 dark:border-dark-border flex flex-col justify-between">
          <div class="space-y-3">
            <h3 class="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              2. Grounded AI Concierge &amp; Machine Action Tags
            </h3>
            <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Rather than an ungrounded generic chatbot, Petites implements a database-grounded shopping assistant in <code class="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">ChatbotService</code> directly coupled to real-time database state and the Angular cart:
            </p>
            <ul class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-2 pl-4 list-disc marker:text-indigo-600">
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Live Inventory Injection:</strong> Dynamic system prompts inject the real PostgreSQL catalog (quantities, instant availability, and pricing) on every turn, grounding product recommendations in active stock.
              </li>
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Multi-Model Resilient Fallback:</strong> Calls Google Gemini 3.5 Flash Lite &rarr; Gemini 3.6 Flash &rarr; OpenAI GPT-4o-mini &rarr; deterministic bilingual Arabic/English rule-based NLP parser.
              </li>
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Machine Action Protocol:</strong> The LLM outputs strict machine tags like <code class="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">[ACTION:ADD_TO_CART:id:qty:mode]</code> which the frontend chatbot widget parses to trigger Angular cart mutations directly.
              </li>
            </ul>
          </div>
          <div class="p-3.5 rounded-lg bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed font-mono">
            <span class="text-indigo-600 dark:text-indigo-400 font-bold block mb-0.5">Machine Protocol Example:</span>
            [ACTION:ADD_TO_CART:nutella-brioche:2:INSTANT] &bull; Dispatches directly into Angular Signal Cart Store without user typing.
          </div>
        </div>

        <!-- Pillar 3: Dedicated Operations Dashboard & 8-Stage Lifecycle -->
        <div class="space-y-4 p-5 rounded-xl bg-neutral-50/80 dark:bg-dark-surface/60 border border-neutral-200 dark:border-dark-border flex flex-col justify-between">
          <div class="space-y-3">
            <h3 class="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              3. Operations Panel &amp; 8-Stage Order Lifecycle
            </h3>
            <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Artisanal kitchen operations are managed via a standalone Angular 19 dashboard deployed on a protected subdomain (<code class="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">admin.petites.com</code>):
            </p>
            <ul class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-2 pl-4 list-disc marker:text-emerald-600">
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">8-Stage Lifecycle Pipeline:</strong> Tracks transitions across <code class="text-neutral-900 dark:text-white font-mono text-[11px]">PENDING</code> &rarr; <code class="text-neutral-900 dark:text-white font-mono text-[11px]">CONFIRMED</code> &rarr; <code class="text-neutral-900 dark:text-white font-mono text-[11px]">IN_PREPARATION</code> &rarr; <code class="text-neutral-900 dark:text-white font-mono text-[11px]">OUT_FOR_DELIVERY</code> &rarr; <code class="text-neutral-900 dark:text-white font-mono text-[11px]">COMPLETED</code>.
              </li>
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Kitchen Capacity &amp; Blackout Rules:</strong> Live toggles for daily batch baking limits and weekly blackout days (e.g., closing baking queues on Mondays).
              </li>
              <li>
                <strong class="font-semibold text-neutral-900 dark:text-white">Loyalty &amp; Promotions Engine:</strong> Order milestone tracking (rewarding dynamic dessert gifts after every 5 completed orders) and coupon validation with usage limits.
              </li>
            </ul>
          </div>
          <div class="p-3.5 rounded-lg bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed">
            <strong class="font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">Staff RBAC &amp; Media CDN:</strong>
            Granular route guards govern user management and Cloudinary media catalog synchronization.
          </div>
        </div>

        <!-- Pillar 4: Production Topology & Jenkins CI/CD -->
        <div class="space-y-4 p-5 rounded-xl bg-neutral-50/80 dark:bg-dark-surface/60 border border-neutral-200 dark:border-dark-border flex flex-col justify-between">
          <div class="space-y-3">
            <h3 class="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
              4. Zero-Exposure Security &amp; Jenkins CI/CD
            </h3>
            <div class="p-3 rounded-lg bg-[#0e1017] text-neutral-200 font-mono text-[11px] overflow-x-auto border border-neutral-800">
              <pre class="leading-relaxed">
petites.com (:80) ────► [Frontend Nginx] ──┐
                                           │ (petites-net Private Bridge)
admin.petites.com (:8081)► [Dashboard Nginx]► [Spring Boot API :8080]
                                                       │
                                                       ▼
                                              [PostgreSQL 16 :5432]
                                              (Volume: petites-pgdata)
              </pre>
            </div>
            <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <strong class="font-semibold text-neutral-900 dark:text-white">Zero-Exposure Invariant:</strong> The Spring Boot API (:8080) and PostgreSQL (:5432) have zero host-exposed ports. Traffic enters exclusively through Nginx reverse proxies with SSL termination and gzip compression.
            </p>
          </div>
          <div class="p-3.5 rounded-lg bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed">
            <strong class="font-semibold text-neutral-900 dark:text-white block mb-0.5">Automated Jenkins Pipeline:</strong>
            <code class="text-neutral-900 dark:text-white">Jenkinsfile</code> defines automated stages: Checkout &rarr; Maven Build &rarr; Unit/Integration Tests &rarr; Multi-Stage Docker Packaging (Temurin JRE Alpine) &rarr; Docker Compose staging deployment.
          </div>
        </div>
      </div>

      <!-- Deep Dive Grid: Key Technical Guarantees -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-neutral-200 dark:border-dark-border">
        <div class="p-4 rounded-xl border border-neutral-200 dark:border-dark-border bg-neutral-50/70 dark:bg-dark-surface/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-1.5 flex items-center gap-1.5">
            <app-icon name="shield-check" [size]="14" className="text-emerald-600 dark:text-emerald-400"></app-icon>
            Atomic Checkout
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Inventory reservation, daily capacity quota decrement, and multi-order creation occur within a single database transaction with automatic rollback.
          </p>
        </div>

        <div class="p-4 rounded-xl border border-neutral-200 dark:border-dark-border bg-neutral-50/70 dark:bg-dark-surface/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-1.5 flex items-center gap-1.5">
            <app-icon name="sparkles" [size]="14" className="text-indigo-600 dark:text-indigo-400"></app-icon>
            Bilingual AI Concierge
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Live catalog DB grounding with Gemini 3.5/3.6 multi-model fallback and machine action tags driving Angular cart state directly.
          </p>
        </div>

        <div class="p-4 rounded-xl border border-neutral-200 dark:border-dark-border bg-neutral-50/70 dark:bg-dark-surface/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-1.5 flex items-center gap-1.5">
            <app-icon name="check-circle" [size]="14" className="text-amber-600 dark:text-amber-400"></app-icon>
            InstaPay Integration
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Egyptian InstaPay QR code and payment link onboarding with staff reconciliation before order transition to IN_PREPARATION.
          </p>
        </div>

        <div class="p-4 rounded-xl border border-neutral-200 dark:border-dark-border bg-neutral-50/70 dark:bg-dark-surface/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-1.5 flex items-center gap-1.5">
            <app-icon name="cpu" [size]="14" className="text-cyan-600 dark:text-cyan-400"></app-icon>
            Jenkins &amp; Topology
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Multi-stage Docker builds, Actuator healthcheck dependency chains, and automated Jenkins CI/CD pipeline on host-isolated networks.
          </p>
        </div>
      </div>
    </article>
  `
})
export class PetitesCaseStudyComponent {}
