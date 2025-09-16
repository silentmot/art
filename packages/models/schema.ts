import { z } from 'zod'

// Common primitives (no defaults, strict typing)
export const Id = z.string().uuid()
export type Id = z.infer<typeof Id>

export const ISODateTime = z.string().datetime()
export type ISODateTime = z.infer<typeof ISODateTime>

export const CurrencyCode = z.string().regex(/^[A-Z]{3}$/)
export type CurrencyCode = z.infer<typeof CurrencyCode>

export const Money = z.object({
  currency: CurrencyCode,
  // Minor units (e.g., cents). Nonnegative integer.
  amount: z.number().int().nonnegative(),
})
export type Money = z.infer<typeof Money>

export const DimensionUnit = z.enum(['cm', 'in'])
export type DimensionUnit = z.infer<typeof DimensionUnit>

export const Dimensions = z.object({
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
  depth: z.number().nonnegative().optional(),
  unit: DimensionUnit,
})
export type Dimensions = z.infer<typeof Dimensions>

export const MediaKind = z.enum(['image', 'video'])
export type MediaKind = z.infer<typeof MediaKind>

export const MediaAsset = z.object({
  id: Id,
  kind: MediaKind,
  // Recommend storing Cloudinary public ID; URL can be resolved via CDN/transforms layer.
  publicId: z.string().min(1),
  alt: z.string().min(1).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
})
export type MediaAsset = z.infer<typeof MediaAsset>

// Catalog
export const Artist = z.object({
  id: Id,
  slug: z.string().min(1),
  name: z.string().min(1),
  bio: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Artist = z.infer<typeof Artist>

export const Category = z.object({
  id: Id,
  slug: z.string().min(1),
  name: z.string().min(1),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Category = z.infer<typeof Category>

export const Collection = z.object({
  id: Id,
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Collection = z.infer<typeof Collection>

export const Sku = z.object({
  id: Id,
  artworkId: Id,
  sku: z.string().min(1),
  isOriginal: z.boolean().default(false).transform(Boolean),
  isDigital: z.boolean().default(false).transform(Boolean),
  editionSize: z.number().int().positive().optional(),
  // For physical SKUs; unlimited for digital can be represented as null quantity in DB layer
  stockQuantity: z.number().int().nonnegative().nullable(),
  price: Money,
  compareAtPrice: Money.optional(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Sku = z.infer<typeof Sku>

export const Artwork = z.object({
  id: Id,
  artistId: Id,
  title: z.string().min(1),
  description: z.string().optional(),
  year: z.number().int().optional(),
  materials: z.array(z.string().min(1)).default([]),
  dimensions: Dimensions.optional(),
  tags: z.array(z.string().min(1)).default([]),
  categoryIds: z.array(Id).default([]),
  collectionIds: z.array(Id).default([]),
  media: z.array(MediaAsset).default([]),
  // Variants/SKUs available for this artwork
  skus: z.array(Sku).default([]),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Artwork = z.infer<typeof Artwork>

// Customer & identity (Supabase Auth used externally; this stores profile extensions)
export const Address = z.object({
  id: Id,
  label: z.string().min(1).optional(),
  fullName: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  region: z.string().min(1).optional(),
  postalCode: z.string().min(1),
  countryCode: z.string().length(2), // ISO 3166-1 alpha-2
})
export type Address = z.infer<typeof Address>

export const Customer = z.object({
  id: Id,
  email: z.string().email(),
  fullName: z.string().min(1).optional(),
  defaultAddressId: Id.optional(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Customer = z.infer<typeof Customer>

// Cart
export const CartItem = z.object({
  skuId: Id,
  quantity: z.number().int().positive(),
})
export type CartItem = z.infer<typeof CartItem>

export const Cart = z.object({
  id: Id,
  customerId: Id.optional(),
  sessionId: z.string().min(1).optional(),
  currency: CurrencyCode,
  items: z.array(CartItem).default([]),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Cart = z.infer<typeof Cart>

// Orders
export const OrderItem = z.object({
  skuId: Id,
  // Snapshot data at time of purchase
  title: z.string().min(1),
  artistName: z.string().min(1).optional(),
  quantity: z.number().int().positive(),
  unitPrice: Money,
  subtotal: Money,
  tax: Money.optional(),
  total: Money,
})
export type OrderItem = z.infer<typeof OrderItem>

export const PaymentStatus = z.enum([
  'requires_payment',
  'paid',
  'refunded',
  'failed',
  'canceled',
])
export type PaymentStatus = z.infer<typeof PaymentStatus>

export const FulfillmentStatus = z.enum([
  'unfulfilled',
  'processing',
  'shipped',
  'delivered',
  'digital_delivered',
  'returned',
  'canceled',
])
export type FulfillmentStatus = z.infer<typeof FulfillmentStatus>

export const Order = z.object({
  id: Id,
  customerId: Id.optional(),
  email: z.string().email(),
  currency: CurrencyCode,
  items: z.array(OrderItem).nonempty(),
  shippingAddress: Address.optional(),
  billingAddress: Address.optional(),
  subtotal: Money,
  tax: Money.optional(),
  shipping: Money.optional(),
  discount: Money.optional(),
  total: Money,
  paymentStatus: PaymentStatus,
  fulfillmentStatus: FulfillmentStatus,
  stripePaymentIntentId: z.string().min(1).optional(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
})
export type Order = z.infer<typeof Order>

// Minimal exports barrel for consumers
export const Schema = {
  Id,
  ISODateTime,
  CurrencyCode,
  Money,
  DimensionUnit,
  Dimensions,
  MediaKind,
  MediaAsset,
  Artist,
  Category,
  Collection,
  Sku,
  Artwork,
  Address,
  Customer,
  CartItem,
  Cart,
  OrderItem,
  PaymentStatus,
  FulfillmentStatus,
  Order,
}

export type {
  Artist as ArtistType,
  Artwork as ArtworkType,
  Category as CategoryType,
  Collection as CollectionType,
  Sku as SkuType,
  Address as AddressType,
  Customer as CustomerType,
  Cart as CartType,
  CartItem as CartItemType,
  Order as OrderType,
  OrderItem as OrderItemType,
}

