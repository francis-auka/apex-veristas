"use client";
import { useState, useEffect } from "react";
import { Search, MapPin, Award, Star, Loader2, Filter, ExternalLink } from "lucide-react";
import Link from "next/link";

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
  credentialCount: number;
  verifiedCredentials: number;
}

export default function ExpertsDirectory() {
  const [pros, setPros]       = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [error, setError]     = useState("");

  useEffect(() => {
    fetchPros();
  }, []);

  async function fetchPros() {
    try {
      setLoading(true);
      const res = await fetch(`/api/marketplace/pros?search=${search}`);
      const json = await res.json();
      if (json.success) {
        setPros(json.data);
      } else {
        throw new Error(json.error);
      }
    } catch (err: any) {
      setError("Failed to load professionals.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPros();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy" style={{ color: "#1B2A4A" }}>Experts Marketplace</h1>
        <p className="text-sm text-gray-500">Hire certified HSEQ professionals for audits, training, and consulting.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, skill, or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2">
          Search Experts
        </button>
      </form>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-400 text-sm">Finding the best experts for you...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-red-50 border border-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      ) : pros.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-100">
          <p className="text-gray-400">No professionals found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pros.map((pro) => (
            <div key={pro.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {pro.profileImageUrl ? (
                      <img src={pro.profileImageUrl} alt={pro.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-gray-400">{pro.fullName[0]}</span>
                    )}
                  </div>
                  {pro.isVerified ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase tracking-wider">
                      <Award className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-50 text-yellow-700 border border-yellow-100 uppercase tracking-wider">
                      <Loader2 className="w-3 h-3" /> Pending Verification
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-brand-navy mb-1" style={{ color: "#1B2A4A" }}>{pro.fullName}</h3>
                <p className="text-green-600 text-sm font-semibold mb-3">{pro.title}</p>
                
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {pro.location || "Remote"}
                  </div>
                  {pro.avgRating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {pro.avgRating} ({pro.reviewCount})
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                  {pro.bio || "No biography provided."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                   <div className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-gray-500 rounded border border-gray-100">
                     {pro.yearsOfExperience || "0"}+ yrs experience
                   </div>
                   <div className="text-[10px] font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded border border-blue-100">
                     {pro.verifiedCredentials} Verified Licenses
                   </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-gray-900">
                    {pro.hourlyRate ? `$${pro.hourlyRate}/hr` : "Ask for Rate"}
                  </span>
                </div>
                <Link 
                  href={`/portal/experts/${pro.id}`} 
                  className="inline-flex items-center gap-2 text-xs font-bold text-green-700 hover:underline"
                >
                  View Profile <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
