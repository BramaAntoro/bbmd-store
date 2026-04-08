"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema/products.schema";
import { TypeProductInput } from "../types/ProductInput.type";
import postProductAction from "../actions/postProduct.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AddProductModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AddProductModal({ open, onClose }: AddProductModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TypeProductInput>({
    resolver: zodResolver(productSchema) as unknown as Resolver<TypeProductInput>,
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit: SubmitHandler<TypeProductInput> = async (data) => {
    try {
      await postProductAction(data);
      reset();
      onClose();
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Terjadi kesalahan tidak diketahui");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-900">
            Add Product
          </DialogTitle>
        </DialogHeader>

        {serverError && <p className="text-xs text-red-500">{serverError}</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 py-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-700">
                Nama product<span className="text-red-500">*</span>
              </Label>
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
              <Input
                {...register("name")}
                placeholder="e.g. Wireless Mouse"
                className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
              />
            </div>

            {/* SKU & Barcode */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-700">SKU</Label>
                {errors.sku && (
                  <p className="text-xs text-red-500">{errors.sku.message}</p>
                )}
                <Input
                  {...register("sku")}
                  placeholder="e.g. SKU-001"
                  className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-700">
                  Barcode <span className="text-red-500">*</span>
                </Label>
                {errors.barcode && (
                  <p className="text-xs text-red-500">
                    {errors.barcode.message}
                  </p>
                )}
                <Input
                  {...register("barcode")}
                  placeholder="e.g. BAR-001"
                  className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            {/* Price & Cost */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-700">
                  Harga <span className="text-red-500">*</span>
                </Label>
                {errors.price && (
                  <p className="text-xs text-red-500">{errors.price.message}</p>
                )}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-medium">
                    Rp
                  </span>
                  <Input
                    {...register("price")}
                    type="number"
                    placeholder="0"
                    className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500 pl-8"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-700">
                  Biaya/Modal <span className="text-red-500">*</span>
                </Label>
                {errors.cost && (
                  <p className="text-xs text-red-500">{errors.cost.message}</p>
                )}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-medium">
                    Rp
                  </span>
                  <Input
                    {...register("cost")}
                    type="number"
                    placeholder="0"
                    className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500 pl-8"
                  />
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-700">
                Stock <span className="text-red-500">*</span>
              </Label>
              {errors.stock && (
                <p className="text-xs text-red-500">{errors.stock.message}</p>
              )}
              <Input
                {...register("stock")}
                type="number"
                placeholder="0"
                className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-zinc-200 text-zinc-700 hover:bg-zinc-50 h-9 px-4 text-sm"
            >
              Batal
            </Button>
            {/* <input
              className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-4 text-sm"
              type="submit"
              value="Simpan"
            /> */}
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-4 text-sm"
            >
              {isSubmitting ? "Menyimpan" : "Simpan product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
