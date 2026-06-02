"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  User, Briefcase, MapPin, DollarSign, 
  Award, Plus, Trash2, Save, Loader2, CheckCircle2 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProfessionalProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: "",
    title: "",
    bio: "",
    location: "",
    hourlyRate: "",
    yearsOfExperience: "",
  });

  const [credentials, setCredentials] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session]);

  async function fetchProfile() {
    try {
      setLoading(true);
      const { data: pro, error } = await supabase
        .from("pros")
        .select(`*, pro_credentials(*)`)
        .eq("user_email", session?.user?.email)
        .single();

      if (error) throw error;
      
      if (pro) {
        setProfile({
          fullName: pro.full_name || "",
          title: pro.title || "",
          bio: pro.bio || "",
          location: pro.location || "",
          hourlyRate: pro.hourly_rate?.toString() || "",
          yearsOfExperience: pro.years_of_experience?.toString() || "",
        });
        setCredentials(pro.pro_credentials || []);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from("pros")
        .update({
          full_name: profile.fullName,
          title: profile.title,
          bio: profile.bio,
          location: profile.location,
          hourly_rate: profile.hourlyRate ? parseFloat(profile.hourlyRate) : null,
          years_of_experience: profile.yearsOfExperience ? parseInt(profile.yearsOfExperience) : null,
        })
        .eq("user_email", session?.user?.email);

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy" style={{ color: "#1B2A4A" }}>Professional Profile</h1>
        <p className="text-sm text-gray-500">Manage your expert identity and certifications in the marketplace.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-100 rounded-xl p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "#1B2A4A" }}>
              <User className="w-5 h-5 text-green-600" /> Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={profile.fullName} 
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Professional Title</label>
                <input 
                  type="text" 
                  value={profile.title} 
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="e.g. Lead Health & Safety Auditor"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={profile.location} 
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                    placeholder="City, Country"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Years of Exp.</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="number" 
                    value={profile.yearsOfExperience} 
                    onChange={(e) => setProfile({...profile, yearsOfExperience: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Hourly Rate (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="number" 
                    value={profile.hourlyRate} 
                    onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Professional Bio</label>
              <textarea 
                rows={5}
                value={profile.bio} 
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-none"
                placeholder="Describe your expertise and what you can offer to clients..."
              />
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-fit flex items-center gap-2 ml-auto">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </form>

          {/* Credentials Section */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "#1B2A4A" }}>
                <Award className="w-5 h-5 text-blue-600" /> Certifications & Licenses
              </h2>
              <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add Credential
              </button>
            </div>

            <div className="space-y-4">
              {credentials.length === 0 ? (
                <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-lg">
                  <p className="text-sm text-gray-400">No credentials added yet. Upload proof of your expertise to get verified.</p>
                </div>
              ) : (
                credentials.map((cred) => (
                  <div key={cred.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded flex items-center justify-center border border-gray-200">
                        <Award className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy">{cred.title}</h4>
                        <p className="text-[10px] text-gray-500">{cred.issuing_body}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        cred.verification_status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {cred.verification_status}
                      </span>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Preview/Status */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">Verification Status</h3>
            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
              <div className="flex-shrink-0">
                <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" />
              </div>
              <div>
                <p className="text-xs font-bold text-yellow-800">Pending Review</p>
                <p className="text-[10px] text-yellow-700">Admins are reviewing your credentials. You will appear in the marketplace once verified.</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-navy text-white rounded-xl p-6 shadow-xl" style={{ backgroundColor: "#1B2A4A" }}>
             <h3 className="text-sm font-bold mb-4 opacity-60 uppercase tracking-wider">Marketplace View</h3>
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="font-bold">{profile.fullName || "Your Name"}</p>
                      <p className="text-xs opacity-70">{profile.title || "Your Title"}</p>
                   </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-1 text-xs">
                      <Award className="w-3 h-3 text-green-400" />
                      <span>{credentials.filter(c => c.verification_status === 'verified').length} Licenses</span>
                   </div>
                   <div className="text-xs font-bold text-green-400">
                      {profile.hourlyRate ? `$${profile.hourlyRate}/hr` : "−"}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
