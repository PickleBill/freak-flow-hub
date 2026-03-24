import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import ApparelDetail from "./pages/ApparelDetail.tsx";
import FutureOfFreaking from "./pages/FutureOfFreaking.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import PreorderPage from "./pages/PreorderPage.tsx";
import ShopPage from "./pages/ShopPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/apparel/:slug" element={<ApparelDetail />} />
            <Route path="/future" element={<FutureOfFreaking />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/preorder/:slug" element={<PreorderPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
