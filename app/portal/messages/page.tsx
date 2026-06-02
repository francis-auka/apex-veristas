"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  MessageSquare, Send, User, 
  Search, Loader2, ArrowLeft, CheckCircle2 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Message {
  id: string;
  sender_email: string;
  receiver_email: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetchMessages();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('realtime_messages')
      .on(
        'postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `receiver_email=eq.${session.user.email}` 
        }, 
        (payload) => {
          console.log('New message received!', payload);
          setMessages(prev => [payload.new as Message, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  async function fetchMessages() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_email.eq.${session?.user?.email},receiver_email.eq.${session?.user?.email}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  // Group messages by contact
  const contacts = Array.from(new Set(messages.map(m => 
    m.sender_email === session?.user?.email ? m.receiver_email : m.sender_email
  )));

  const chatMessages = messages.filter(m => 
    (m.sender_email === session?.user?.email && m.receiver_email === selectedChat) ||
    (m.receiver_email === session?.user?.email && m.sender_email === selectedChat)
  ).reverse();

  async function handleSendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim() || !selectedChat) return;
    
    const newMessage: Message = {
      id: Math.random().toString(), // temporary id
      sender_email: session?.user?.email || "",
      receiver_email: selectedChat,
      content: reply,
      created_at: new Date().toISOString(),
      is_read: false
    };

    // Optimistic update
    setMessages(prev => [newMessage, ...prev]);
    setReply("");

    try {
      const { error } = await supabase.from("messages").insert({
        sender_email: session?.user?.email,
        receiver_email: selectedChat,
        content: reply,
      });
      if (error) throw error;
    } catch (err) {
      toast.error("Failed to send message");
      fetchMessages(); // Rollback if error
    } 
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy" style={{ color: "#1B2A4A" }}>Secure Inbox</h1>
        <p className="text-sm text-gray-500">Communicating as: {session?.user?.email}</p>
      </div>

      <div className="flex-1 flex bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Left Sidebar: Contacts List */}
        <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
           <div className="p-4 border-b border-gray-100 italic text-[10px] text-gray-400 uppercase font-bold tracking-widest">
              Recent Conversations
           </div>
           <div className="flex-1 overflow-y-auto">
              {contacts.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  No messages yet.
                </div>
              ) : (
                contacts.map(email => (
                  <button 
                    key={email}
                    onClick={() => setSelectedChat(email)}
                    className={`w-full p-4 flex items-center gap-3 text-left border-b border-gray-50 hover:bg-gray-50 transition-all ${selectedChat === email ? 'bg-green-50/50 border-r-4 border-r-green-600' : ''}`}
                  >
                     <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <User className="w-5 h-5" />
                     </div>
                     <div className="flex-1 overflow-hidden">
                        <div className="text-xs font-bold text-brand-navy truncate">{email}</div>
                        <div className="text-[10px] text-gray-400 truncate">
                          {messages.find(m => m.sender_email === email || m.receiver_email === email)?.content}
                        </div>
                     </div>
                  </button>
                ))
              )}
           </div>
        </div>

        {/* Right Area: Chat Window */}
        <div className={`flex-1 flex flex-col bg-gray-50/30 ${!selectedChat ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
           {selectedChat ? (
             <>
               {/* Chat Header */}
               <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                       <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                       <User className="w-4 h-4" />
                    </div>
                    <div>
                       <div className="text-xs font-bold text-brand-navy">{selectedChat}</div>
                       <div className="text-[10px] text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Secure Channel
                       </div>
                    </div>
                  </div>
               </div>

               {/* Messages Area */}
               <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
                  {chatMessages.map((m) => (
                    <div 
                      key={m.id}
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        m.sender_email === session?.user?.email 
                        ? 'bg-green-600 text-white self-end rounded-tr-none' 
                        : 'bg-white text-gray-700 border border-gray-100 self-start rounded-tl-none'
                      }`}
                    >
                       {m.content}
                       <div className={`text-[9px] mt-1 opacity-60 ${m.sender_email === session?.user?.email ? 'text-right' : 'text-left'}`}>
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                    </div>
                  ))}
               </div>

               {/* Input Area */}
               <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-gray-100 flex gap-3">
                  <input 
                    type="text" 
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                  <button 
                    disabled={sending || !reply.trim()}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                  >
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
               </form>
             </>
           ) : (
             <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                   <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select a conversation</h3>
                <p className="text-xs text-gray-400">Choose a contact on the left to start messaging.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
