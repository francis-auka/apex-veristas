"use client";
import { useState, useEffect } from "react";
import { 
  MapPin, Award, Star, Loader2, CheckCircle2, 
  Mail, Calendar, ArrowLeft, ShieldCheck, Briefcase
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Credential {
  id: string;
  title: string;
  issuingBody: string;
  certificateUrl: string | null;
  expiryDate: string | null;
  verificationStatus: string;
}

interface Review {
  id: string;
  clientEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Professional {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  location: string;
  hourlyRate: number | null;
  yearsOfExperience: number | null;
  profileImageUrl: string | null;
  isVerified: boolean;
  avgRating: number | null;
  reviewCount: number;
  credentials: Credential[];
  reviews: Review[];
}

export default function ExpertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [pro, setPro] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modals
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [content, setContent] = useState("");
  const [serviceType, setServiceType] = useState("Consultation");

  useEffect(() => {
    if (params.id) {
      fetchProDetail();
    }
  }, [params.id]);

  async function fetchProDetail() {
    try {
      setLoading(true);
      const res = await fetch(`/api/marketplace/pros/${params.id}`);
      const json = await res.json();
      if (json.success) {
        setPro(json.data);
      } else {
        toast.error(json.error || "Failed to load professional details.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user?.email) return toast.error("Please sign in to request services");
    setSubmitting(true);
    try {
      const { error } = await supabase.from("service_requests").insert({
        client_email: session.user.email,
        pro_id: pro?.id,
        service_type: serviceType,
        description: content,
      });
      if (error) throw error;
      toast.success("Service request sent successfully!");
      setShowRequestModal(false);
      setContent("");
    } catch (err) {
      toast.error("Failed to send request");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user?.email) return toast.error("Please sign in to send messages");
    if (!pro?.id) return;
    setSubmitting(true);
    try {
      const { data: proData } = await supabase.from("pros").select("user_email").eq("id", pro.id).single();
      
      const { error } = await supabase.from("messages").insert({
        sender_email: session.user.email,
        receiver_email: proData?.user_email,
        content: content,
      });
      if (error) throw error;
      toast.success("Message sent successfully!");
      setShowMessageModal(false);
      setContent("");
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      <p className="text-gray-400 text-sm">Loading profile...</p>
    </div>
  );

  if (!pro) return (
    <div className="text-center py-20">
      <p className="text-gray-400">Professional not found.</p>
      <button onClick={() => router.back()} className="mt-4 text-green-600 font-bold hover:underline">
        Go Back
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <button onClick={() => router.back()} className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-navy transition-colors">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Directory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Main Profile */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Header */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner">
                {pro.profileImageUrl ? (
                  <img src={pro.profileImageUrl} alt={pro.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-gray-200">{pro.fullName[0]}</span>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-extrabold text-brand-navy" style={{ color: "#1B2A4A" }}>{pro.fullName}</h1>
                  {pro.isVerified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                      <ShieldCheck className="w-4 h-4" /> Verified Expert
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold text-green-600">{pro.title}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" /> {pro.location || "Remote"}</div>
                  <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-600" /> {pro.yearsOfExperience || "0"}+ Years Experience</div>
                  {pro.avgRating && (
                    <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {pro.avgRating} ({pro.reviewCount} Reviews)</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About & Bio */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-brand-navy" style={{ color: "#1B2A4A" }}>Professional Biography</h2>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
              {pro.bio || "No biography provided."}
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-brand-navy" style={{ color: "#1B2A4A" }}>Client Testimonials ({pro.reviewCount})</h2>
             <div className="grid grid-cols-1 gap-4">
                {pro.reviews.length === 0 ? (
                  <div className="p-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                    <p className="text-sm text-gray-400">No reviews yet for this professional.</p>
                  </div>
                ) : (
                  pro.reviews.map((rev) => (
                    <div key={rev.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                             {[1,2,3,4,5].map(s => (
                               <Star key={s} className={`w-4 h-4 ${s <= rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                             ))}
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">{new Date(rev.createdAt).toLocaleDateString()}</span>
                       </div>
                       <p className="text-sm text-gray-700 italic">"{rev.comment}"</p>
                       <p className="text-xs font-bold text-gray-500">— {rev.clientEmail.split('@')[0]}</p>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Right Sidebar: Booking & Stats */}
        <div className="space-y-6">
          <div className="bg-brand-navy text-white rounded-2xl p-8 shadow-xl sticky top-24" style={{ backgroundColor: "#1B2A4A" }}>
            <div className="text-center space-y-6">
              <div>
                <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-2">Service Rate</p>
                <div className="text-4xl font-black">{pro.hourlyRate ? `$${pro.hourlyRate}` : "Custom"}<span className="text-sm font-normal opacity-60">/hr</span></div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <button 
                  onClick={() => setShowRequestModal(true)}
                  className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black text-sm uppercase tracking-widest transition-all rounded-lg shadow-lg shadow-green-900/40"
                >
                  Request Service
                </button>
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Message Expert
                </button>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-4">
                 <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-lg font-black">{pro.credentials.filter(c => c.verificationStatus === 'verified').length}</div>
                    <div className="text-[9px] font-bold opacity-50 uppercase">Verified Licenses</div>
                 </div>
                 <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-lg font-black text-yellow-400">{pro.avgRating || "N/A"}</div>
                    <div className="text-[9px] font-bold opacity-50 uppercase">Rating Score</div>
                 </div>
              </div>
            </div>
          </div>

          {/* Credentials Summary */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
             <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Credentials</h3>
             <div className="space-y-3">
                {pro.credentials.map((cred) => (
                  <div key={cred.id} className="flex items-start gap-3">
                     <div className="mt-1 flex-shrink-0">
                        {cred.verificationStatus === 'verified' 
                          ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                          : <Loader2 className="w-4 h-4 text-yellow-500" />
                        }
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-900">{cred.title}</p>
                        <p className="text-[10px] text-gray-500">{cred.issuingBody}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>

      {/* Request Service Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <h2 className="text-xl font-bold text-brand-navy">Request HSEQ Service</h2>
            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Type of Service</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20"
                >
                  <option>Consultation</option>
                  <option>Audit</option>
                  <option>Training</option>
                  <option>Risk Assessment</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Details / Requirements</label>
                <textarea 
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe what you need..."
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-2 px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg text-sm hover:bg-green-500 transition-all flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Mail className="w-5 h-5" />
               </div>
               <h2 className="text-xl font-bold text-brand-navy">Message {pro?.fullName}</h2>
            </div>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Message Content</label>
                <textarea 
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-2 px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
