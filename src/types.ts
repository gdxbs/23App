import { createClient } from './server';

export interface MenuItem {
    id: number;
    displayName: string;
    price: string; // may want to be a number instead
    calories?: number;
    description: string;
    imageUrl?: string;
    tags: string[];
    quantity?: number;
    menu_item_ingredients: MenuItemIngredient[];
    toppings?: Topping[]; // Optional toppings property
  }
  
  export interface Ingredient {
    id: string;
    name: string;
    description?: string;
    additional_cost: string;
  }
  
  export interface MenuItemIngredient {
    is_default: boolean;
    ingredients: Ingredient[];
  }
  
  export interface MenuCategory {
    [category: string]: MenuItem[];
  }
  
  export interface Topping {
    displayName: string;
    price: number;
    colNumber: number;
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
  }
  
  export interface Location {
    siteName: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
    };
  }
  

// Type definitions matching database schema
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  logo_url: string;
  created_at: Date;
}

export interface Menu {
  id: number;
  restaurant_id: string;
  title: string;
  description: string;
}

export interface MenuItemDB {
  id: number;
  menu_id: number;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  category?: string;
}

export interface IngredientDB {
  id: number;
  name: string;
  description: string;
  additional_cost: number;
}

export interface MenuItemIngredientDB {
  id: number;
  menu_item_id: number;
  ingredient_id: number;
  is_default: boolean;
}

export interface Order {
  id: number;
  user_id: string;
  restaurant_id: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  created_at: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  customizations: any; // JSON
}

export interface Payment {
  id: number;
  order_id: number;
  payment_method: string;
  transaction_id: string;
  amount: number;
  payment_date: Date;
  payment_status: string;
}

// Deprecated - will be removed
export interface ChatSession {
  id: number;
  user_id: string;
  started_at: Date;
  ended_at: Date;
}

// Deprecated - will be removed
export interface ChatMessage {
  id: number;
  chat_session_id: number;
  sender: 'user' | 'assistant';
  message_text: string;
  timestamp: Date;
}

// New chat history structure for n8n integration
// Type definitions for tool call objects
export interface ToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  };
}

export interface UserMessage {
  type: 'human';
  content: string;
  additional_kwargs: Record<string, unknown>;
  response_metadata: Record<string, unknown>;
}

export interface AIMessage {
  type: 'ai';
  content: string;
  tool_calls: ToolCall[];
  additional_kwargs: Record<string, unknown>;
  response_metadata: Record<string, unknown>;
  invalid_tool_calls: string[];
}

export type ChatMessage2 = UserMessage | AIMessage;

export interface N8nChatHistory {
  id: number;
  session_id: string;
  message: ChatMessage2;
  started_at: Date;
  ended_at: Date | null;
}

// Restaurant functions
export async function getRestaurants(): Promise<Restaurant[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('restaurants')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getRestaurantByName(name: string): Promise<Restaurant | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('name', name)
    .single();
  
  if (error) throw error;
  return data;
}

// Menu functions
export async function getMenusByRestaurantId(restaurantId: string): Promise<Menu[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('restaurant_id', restaurantId);
  
  if (error) throw error;
  return data || [];
}

// Menu items functions with ingredient relationships
export async function getMenuItemsByMenuId(menuId: number): Promise<MenuItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      id,
      name,
      description,
      base_price,
      image_url,
      category,
      menu_item_ingredients (
        is_default,
        ingredients:ingredient_id (
          id,
          name,
          description,
          additional_cost
        )
      )
    `)
    .eq('menu_id', menuId);
  
  if (error) throw error;
  
  // Transform database result to match MenuItem type
  const menuItems: MenuItem[] = data?.map(item => {
    // Map menu_item_ingredients to match the expected format
    const menuItemIngredients: MenuItemIngredient[] = item.menu_item_ingredients.map((rel: any) => ({
      is_default: rel.is_default,
      ingredients: [rel.ingredients] // Wrap in array to match expected format
    }));
    
    return {
      id: item.id,
      displayName: item.name,
      description: item.description,
      price: item.base_price.toString(),
      imageUrl: item.image_url,
      tags: item.category ? [item.category] : [],
      menu_item_ingredients: menuItemIngredients
    };
  }) || [];
  
  return menuItems;
}

export async function getMenuItemById(id: number): Promise<MenuItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      id,
      name,
      description,
      base_price,
      image_url,
      category,
      menu_item_ingredients (
        is_default,
        ingredients:ingredient_id (
          id,
          name,
          description,
          additional_cost
        )
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  if (!data) return null;
  
  // Transform to MenuItem type
  const menuItemIngredients: MenuItemIngredient[] = data.menu_item_ingredients.map((rel: any) => ({
    is_default: rel.is_default,
    ingredients: [rel.ingredients]
  }));
  
  return {
    id: data.id,
    displayName: data.name,
    description: data.description,
    price: data.base_price.toString(),
    imageUrl: data.image_url,
    tags: data.category ? [data.category] : [],
    menu_item_ingredients: menuItemIngredients
  };
}

// Orders functions
export async function createOrder(
  userId: string, 
  restaurantId: string, 
  items: CartItem[], 
  totalAmount: number
): Promise<number> {
  const supabase = await createClient();
  
  // Start a transaction by creating the order first
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      restaurant_id: restaurantId,
      total_amount: totalAmount,
      order_status: 'pending',
      payment_status: 'pending',
      created_at: new Date()
    })
    .select()
    .single();
  
  if (orderError) throw orderError;
  
  // Then add each order item
  for (const item of items) {
    const customizations = item.toppings ? { toppings: item.toppings } : {};
    
    const { error: itemError } = await supabase
      .from('order_items')
      .insert({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        customizations
      });
      
    if (itemError) throw itemError;
  }
  
  return order.id;
}

export async function getOrderById(id: number): Promise<Order | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data || [];
}

export async function updateOrderStatus(
  orderId: number, 
  orderStatus: string, 
  paymentStatus?: string
): Promise<void> {
  const supabase = await createClient();
  const updateData: Partial<Order> = { order_status: orderStatus };
  
  if (paymentStatus) {
    updateData.payment_status = paymentStatus;
  }
  
  const { error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', orderId);
    
  if (error) throw error;
}

// Payment functions
export async function createPayment(
  orderId: number,
  paymentMethod: string,
  transactionId: string,
  amount: number
): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('payments')
    .insert({
      order_id: orderId,
      payment_method: paymentMethod,
      transaction_id: transactionId,
      amount,
      payment_date: new Date(),
      payment_status: 'completed'
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Update the order payment status
  await updateOrderStatus(orderId, 'processing', 'paid');
  
  return data.id;
}

export async function getPaymentsByOrderId(orderId: number): Promise<Payment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data || [];
}

// Deprecated Chat functions - will be removed
/**
 * @deprecated Use n8n_chat_histories table instead
 */
export async function createChatSession(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      user_id: userId,
      started_at: new Date()
    })
    .select()
    .single();
  
  if (error) throw error;
  return data.id;
}

/**
 * @deprecated Use n8n_chat_histories table instead
 */
export async function endChatSession(sessionId: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('chat_sessions')
    .update({ ended_at: new Date() })
    .eq('id', sessionId);
  
  if (error) throw error;
}

/**
 * @deprecated Use n8n_chat_histories table instead
 */
export async function addChatMessage(
  sessionId: number,
  sender: 'user' | 'assistant',
  messageText: string
): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      chat_session_id: sessionId,
      sender,
      message_text: messageText,
      timestamp: new Date()
    })
    .select()
    .single();
  
  if (error) throw error;
  return data.id;
}

/**
 * @deprecated Use n8n_chat_histories table instead
 */
export async function getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('chat_session_id', sessionId)
    .order('timestamp', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

// New n8n Chat history functions - These use the server client
// Use client-side functions in the ChatUI component instead
// These are kept for server components that need to access chat histories
export async function createChatHistoryEntry(
  sessionId: string,
  message: UserMessage | AIMessage,
  startedAt: Date = new Date(),
  endedAt: Date | null = null
): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('n8n_chat_histories')
    .insert({
      session_id: sessionId,
      message,
      started_at: startedAt,
      ended_at: endedAt
    })
    .select()
    .single();
  
  if (error) throw error;
  return data.id;
}

export async function endChatHistorySession(sessionId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('n8n_chat_histories')
    .update({ ended_at: new Date() })
    .eq('session_id', sessionId)
    .is('ended_at', null);
  
  if (error) throw error;
}

export async function getChatHistoriesBySessionId(sessionId: string): Promise<N8nChatHistory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('n8n_chat_histories')
    .select('*')
    .eq('session_id', sessionId)
    .order('started_at', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

// Admin access management
export interface AdminAccess {
  id: string;
  access_code: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  last_used_at?: Date;
}

export async function verifyAdminAccessCode(accessCode: string): Promise<AdminAccess | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('admin_access')
    .select('*')
    .eq('access_code', accessCode)
    .eq('is_active', true)
    .single();
    
  if (error || !data) {
    return null;
  }
  
  // Update last_used_at
  await supabase
    .from('admin_access')
    .update({ last_used_at: new Date() })
    .eq('id', data.id);
    
  return data;
}

// Admin sessions
export interface AdminSession {
  id: string;
  access_code_id: string;
  created_at: Date;
  last_accessed_at: Date;
  expires_at: Date;
  is_active: boolean;
}

export async function createAdminSession(accessCodeId: string): Promise<string | null> {
  const supabase = await createClient();
  
  // Create a new session with expiry
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry
  
  const { data, error } = await supabase
    .from('admin_sessions')
    .insert({
      access_code_id: accessCodeId,
      created_at: new Date().toISOString(),
      last_accessed_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString(),
      is_active: true
    })
    .select()
    .single();
    
  if (error || !data) {
    console.error("Error creating admin session:", error);
    return null;
  }
  
  return data.id;
}

export async function getAdminSession(sessionId: string): Promise<AdminSession | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('admin_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('is_active', true)
    .gt('expires_at', new Date().toISOString())
    .single();
    
  if (error || !data) {
    return null;
  }
  
  // Update last_accessed_at
  await supabase
    .from('admin_sessions')
    .update({ last_accessed_at: new Date().toISOString() })
    .eq('id', sessionId);
    
  return data;
}

export async function invalidateAdminSession(sessionId: string): Promise<void> {
  const supabase = await createClient();
  
  await supabase
    .from('admin_sessions')
    .update({ 
      is_active: false,
      expires_at: new Date().toISOString() // Expire immediately
    })
    .eq('id', sessionId);
}

export async function getAdminAccessCodes(): Promise<AdminAccess[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('admin_access')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
}

export async function createAdminAccessCode(
  accessCode: string, 
  description?: string
): Promise<string> {
  const supabase = await createClient();
  
  // Validate input
  if (!accessCode || accessCode.length !== 6 || !/^\d+$/.test(accessCode)) {
    throw new Error("Access code must be exactly 6 digits");
  }
  
  const { data, error } = await supabase
    .from('admin_access')
    .insert({
      access_code: accessCode,
      description,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    })
    .select()
    .single();
    
  if (error) throw error;
  return data.id;
}

export async function updateAdminAccessCode(
  id: string,
  updates: Partial<Omit<AdminAccess, 'id' | 'created_at'>>
): Promise<void> {
  const supabase = await createClient();
  
  // Add updated_at timestamp
  const updateData = {
    ...updates,
    updated_at: new Date()
  };
  
  const { error } = await supabase
    .from('admin_access')
    .update(updateData)
    .eq('id', id);
    
  if (error) throw error;
}