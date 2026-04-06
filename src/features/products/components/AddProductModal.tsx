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

type AddProductModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AddProductModal({ open, onClose }: AddProductModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-900">
            Add Product
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700">
              Product Name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="e.g. Wireless Mouse"
              className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
            />
          </div>

          {/* SKU & Barcode */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-700">SKU</Label>
              <Input
                placeholder="e.g. SKU-001"
                className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-700">
                Barcode <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g. BAR-001"
                className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Price & Cost */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-700">
                Price <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-medium">
                  Rp
                </span>
                <Input
                  type="number"
                  placeholder="0"
                  className="h-9 text-sm border-zinc-200 focus-visible:ring-emerald-500 pl-8"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-700">
                Cost <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-medium">
                  Rp
                </span>
                <Input
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
            <Input
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
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-4 text-sm">
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
