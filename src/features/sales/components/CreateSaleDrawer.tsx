"use client";

import { useEffect, useState } from "react";
import { Search, Minus, Plus, CheckCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import getProductsAction from "@/features/products/actions/getProducts.action";
import { TypeProduct } from "@/features/products/types/Product.type";
import { AppError } from "@/lib/errors/AppError";
import { TypeSaleInput } from "../types/SaleInput.type";
import postSaleAction from "../actions/postSale.action";
import { useRouter } from "next/navigation";
import { TypeCartItem } from "../types/CartItems.type";
import { TypeCreateSaleDrawerProps } from "../types/CreateSaleDrawerProps.Type";
import { formatNumber } from "@/utils/formatCurrency.util";


export function CreateSaleDrawer({ open, onClose }: TypeCreateSaleDrawerProps) {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<TypeCartItem[]>([]);
  const [scannerActive, setScannerActive] = useState(false);
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchDataProduct = async () => {
      const res = await getProductsAction();
      if (res instanceof AppError) return;
      if (!("data" in res)) return;
      setProducts(res.data ?? []);
    };
    fetchDataProduct();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addToCart = (product: TypeProduct) => {
    if (product.stock === 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          cost: product.cost,
          quantity: 1,
        },
      ];
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)),
    );
  };

  const updateQuantity = (item: TypeCartItem, delta: number) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;
    if (delta === 1 && product.stock === 0) return;

    setCart((prev) =>
      prev
        .map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + delta } : i,
        )
        .filter((i) => i.quantity > 0),
    );

    setProducts((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, stock: p.stock - delta } : p,
      ),
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    setServerError(null);

    try {
      const items: TypeSaleInput = cart.map((item) => ({
        product_id: item.id,
        price: item.price,
        cost: item.cost,
        quantity: item.quantity,
      }));

      await postSaleAction(items);
      setCart([]);
      router.refresh();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Terjadi kesalahan tidak diketahui");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-0 z-50 flex">
        <div className="flex w-full max-w-5xl mx-auto my-4 rounded-2xl overflow-hidden shadow-2xl bg-zinc-50">
          {/* LEFT */}
          <div className="w-[45%] flex flex-col bg-white border-r border-zinc-100">
            <div className="px-6 py-5 border-b border-zinc-100">
              <h2 className="text-xl font-bold text-zinc-900">Terminal POS</h2>
              <p className="text-xs text-zinc-400 mt-1">Siap untuk transaksi</p>
            </div>

            <div className="px-6 py-4 border-b border-zinc-100">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                Cari Produk
              </p>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ketik nama produk..."
                  className="pl-8 h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-2">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border text-left transition-all",
                      product.stock === 0
                        ? "border-zinc-100 bg-zinc-50 opacity-50 cursor-not-allowed"
                        : "border-zinc-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer active:scale-[0.98]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center text-sm font-semibold text-zinc-500 shrink-0">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800 leading-snug">
                          {product.name}
                        </p>
                        <p
                          className={cn(
                            "text-xs mt-0.5",
                            product.stock === 0
                              ? "text-red-400"
                              : product.stock <= 5
                                ? "text-amber-500"
                                : "text-zinc-400",
                          )}
                        >
                          {product.stock === 0
                            ? "Stok habis"
                            : `${product.stock} tersisa`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-zinc-700 shrink-0">
                      {formatNumber(product.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100">
              <Button
                variant="outline"
                onClick={() => setScannerActive(!scannerActive)}
                className={cn(
                  "w-full flex items-center gap-2 h-9 text-sm border-zinc-200",
                  scannerActive &&
                    "border-emerald-400 bg-emerald-50 text-emerald-700",
                )}
              >
                <Camera size={14} />
                {scannerActive ? "Scanner Aktif" : "Aktifkan Scanner Barcode"}
              </Button>

              {scannerActive && (
                <div className="mt-3 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-900 aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs text-zinc-400">
                      Camera feed akan muncul di sini
                    </p>
                  </div>
                  <div className="absolute inset-x-4 h-0.5 bg-emerald-400 top-1/2 animate-pulse" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
                      Live Scanner
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col bg-zinc-50">
            <div className="px-6 py-5 border-b border-zinc-100 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-zinc-900">
                  Pesanan Saat Ini
                </h3>
                {totalItems > 0 && (
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    {totalItems} item
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-zinc-400 text-center">
                    Belum ada produk ditambahkan.
                    <br />
                    Cari atau scan produk di sebelah kiri.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white rounded-xl border border-zinc-100 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center text-sm font-semibold text-zinc-500 shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {formatNumber(item.price)} / item
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item, -1)}
                            className="h-6 w-6 rounded-full border-zinc-200 text-zinc-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                          >
                            <Minus size={10} />
                          </Button>
                          <span className="text-sm font-semibold text-zinc-700 w-5 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item, 1)}
                            className="h-6 w-6 rounded-full border-zinc-200 text-zinc-500 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
                          >
                            <Plus size={10} />
                          </Button>
                        </div>
                        <p className="text-sm font-semibold text-zinc-700 w-24 text-right">
                          {formatNumber(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-5 border-t border-zinc-200 bg-white">
              {serverError && (
                <p className="text-xs text-red-500 mb-3">{serverError}</p>
              )}

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span>Subtotal</span>
                  <span>{formatNumber(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-zinc-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-emerald-600">
                    {formatNumber(total)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onClose} // ✅ tidak perlu disabled saat cart kosong
                  className="flex-1 h-11 border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold text-sm"
                >
                  Batalkan
                </Button>
                <Button
                  onClick={handleSubmit} // ✅ tanpa ()
                  disabled={cart.length === 0 || isSubmitting}
                  className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm disabled:opacity-40"
                >
                  <CheckCircle size={16} className="mr-2" />
                  {isSubmitting ? "Memproses..." : "Selesaikan Transaksi"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
