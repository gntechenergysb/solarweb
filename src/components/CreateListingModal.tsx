import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, Image, Plus, Check, Info } from "lucide-react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  category: z.enum(["panels", "inverters", "batteries", "accessories"]),
  condition: z.enum(["1", "2", "3", "4", "5"]),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  location: z.string().min(3, { message: "Location is required" }),
});

interface CreateListingModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

const CreateListingModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: CreateListingModalProps) => {
  const [step, setStep] = useState<"details" | "images" | "preview">("details");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "panels",
      condition: "4",
      price: "",
      location: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(values);
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  const nextStep = () => {
    if (step === "details") {
      setStep("images");
    } else if (step === "images") {
      setStep("preview");
    }
  };

  const prevStep = () => {
    if (step === "images") {
      setStep("details");
    } else if (step === "preview") {
      setStep("images");
    }
  };

  const conditionLabels = {
    "1": "Poor",
    "2": "Fair",
    "3": "Good",
    "4": "Very Good",
    "5": "Excellent",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Create New Listing
          </DialogTitle>
          <DialogDescription>
            List your pre-owned solar equipment for sale on SolarSwap.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={step} onValueChange={(value) => setStep(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" disabled={step === "preview"}>
              Details
            </TabsTrigger>
            <TabsTrigger
              value="images"
              disabled={!form.formState.isValid && step === "details"}
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              disabled={
                (images.length === 0 && step === "images") || step === "details"
              }
            >
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(nextStep)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 250W Solar Panel" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear, descriptive title helps buyers find your item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="panels">Solar Panels</SelectItem>
                            <SelectItem value="inverters">Inverters</SelectItem>
                            <SelectItem value="batteries">Batteries</SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(conditionLabels).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          <div className="flex items-center gap-1 text-amber-600">
                            <Info size={14} />
                            <span>Platform fee: 10%</span>
                          </div>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your item, including age, specifications, and any defects or wear..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={!form.formState.isValid}>
                    Next: Add Images
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="images" className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-32 h-32 group">
                      <img
                        src={image}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <Plus size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500 mt-2">
                      Add Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {images.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">
                      Drag and drop your images
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse files
                    </p>
                    <label className="cursor-pointer">
                      <Button variant="outline" className="gap-2">
                        <Image size={16} />
                        Select Images
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}

                {images.length > 0 && (
                  <p className="text-sm text-gray-500">
                    {images.length} {images.length === 1 ? "image" : "images"}{" "}
                    uploaded. You can add up to 10 images.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} disabled={images.length === 0}>
                Next: Preview Listing
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6 mt-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {form.getValues().title}
              </h3>

              {images.length > 0 && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img
                    src={images[0]}
                    alt="Primary product image"
                    className="w-full h-64 object-cover"
                  />

                  {images.length > 1 && (
                    <div className="flex mt-2 gap-2 overflow-x-auto pb-2">
                      {images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product image ${index + 2}`}
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Details</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Category:</dt>
                      <dd className="font-medium capitalize">
                        {form.getValues().category}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Condition:</dt>
                      <dd className="font-medium">
                        {
                          conditionLabels[
                            form.getValues()
                              .condition as keyof typeof conditionLabels
                          ]
                        }
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Location:</dt>
                      <dd className="font-medium">
                        {form.getValues().location}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Pricing</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Listing Price:</dt>
                      <dd className="font-medium">
                        ${parseFloat(form.getValues().price).toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-amber-600">
                      <dt>Platform Fee (10%):</dt>
                      <dd>
                        ${(parseFloat(form.getValues().price) * 0.1).toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <dt>You Receive:</dt>
                      <dd>
                        ${(parseFloat(form.getValues().price) * 0.9).toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600 whitespace-pre-line">
                  {form.getValues().description}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Upload size={16} />
                    </motion.div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Publish Listing
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListingModal;
