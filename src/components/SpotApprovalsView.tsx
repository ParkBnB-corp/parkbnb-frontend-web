import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Shield,
  Zap,
  Camera,
  Eye,
  X,
  ExternalLink,
  MessageSquare,
  Search,
  Check,
  Building,
  UserCheck,
} from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { AdminSpot, AdminSpotPhoto } from '../types';

export const SpotApprovalsView: React.FC = () => {
  const [spots, setSpots] = useState<AdminSpot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'PENDING_APPROVAL' | 'ACTIVE' | 'MODIFICATION_REQUESTED' | 'REJECTED'>('PENDING_APPROVAL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  // Photo Lightbox modal
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string; label: string; spotTitle: string } | null>(null);

  // Review modal state (for Reject or Request Modification)
  const [reviewModal, setReviewModal] = useState<{
    spot: AdminSpot;
    action: 'APPROVE' | 'REJECT' | 'REQUEST_MODIFICATION';
  } | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('Society / RWA access permission not verified');
  const [modificationNotes, setModificationNotes] = useState<string>('');

  const fetchSpots = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getSpots('ALL');
      setSpots(data);
    } catch (err) {
      console.error('Failed to load spots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  const handleExecuteReview = async () => {
    if (!reviewModal) return;
    const { spot, action } = reviewModal;
    setActionInProgress(spot.id);

    try {
      await adminApi.reviewSpot(spot.id, action, {
        rejectionReason: action === 'REJECT' ? rejectionReason : undefined,
        modificationNotes: action === 'REQUEST_MODIFICATION' ? modificationNotes : undefined,
      });

      // Update spot in local state
      let updatedStatus: any = 'ACTIVE';
      if (action === 'REJECT') updatedStatus = 'REJECTED';
      if (action === 'REQUEST_MODIFICATION') updatedStatus = 'MODIFICATION_REQUESTED';

      setSpots((prev) =>
        prev.map((s) =>
          s.id === spot.id
            ? {
                ...s,
                status: updatedStatus,
                rejectionReason: action === 'REJECT' ? rejectionReason : undefined,
                modificationNotes: action === 'REQUEST_MODIFICATION' ? modificationNotes : undefined,
              }
            : s
        )
      );

      setReviewModal(null);
      setModificationNotes('');
    } catch (err: any) {
      alert(`Action failed: ${err.message}`);
    } finally {
      setActionInProgress(null);
    }
  };

  const getPhotosList = (spot: AdminSpot): AdminSpotPhoto[] => {
    if (Array.isArray(spot.photos)) {
      return spot.photos.map((p: any) =>
        typeof p === 'string' ? { url: p, label: 'Angle Photo' } : p
      );
    }
    if (spot.photos && typeof spot.photos === 'object') {
      return Object.entries(spot.photos).map(([key, val]: [string, any]) => ({
        key,
        label: key === 'street' ? 'Street Entrance' : key === 'bayFront' ? 'Bay Front' : key === 'rearClearance' ? 'Rear Clearance' : 'Gate Barrier',
        url: typeof val === 'string' ? val : val?.url || '',
      })).filter(p => !!p.url);
    }
    return [];
  };

  const pendingCount = spots.filter((s) => s.status === 'PENDING_APPROVAL').length;
  const activeCount = spots.filter((s) => s.status === 'ACTIVE').length;
  const modReqCount = spots.filter((s) => s.status === 'MODIFICATION_REQUESTED').length;
  const rejectedCount = spots.filter((s) => s.status === 'REJECTED').length;

  const filteredSpots = spots.filter((s) => {
    if (selectedFilter !== 'ALL' && s.status !== selectedFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        (s.hostName && s.hostName.toLowerCase().includes(q)) ||
        (s.hostUserId && s.hostUserId.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Parking Space Approvals & Listings
            </h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                {pendingCount} Pending Review
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Inspect 4-angle verification photos, check society/gate security access rules, and clear or reject listings for live driver booking.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by spot title, address, host..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSelectedFilter('PENDING_APPROVAL')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            selectedFilter === 'PENDING_APPROVAL'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Verification</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono">
            {pendingCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedFilter('ACTIVE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            selectedFilter === 'ACTIVE'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Live & Active</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
            {activeCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedFilter('MODIFICATION_REQUESTED')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            selectedFilter === 'MODIFICATION_REQUESTED'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Changes Requested</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-orange-500/20 text-orange-300 font-mono">
            {modReqCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedFilter('REJECTED')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            selectedFilter === 'REJECTED'
              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Rejected</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500/20 text-red-300 font-mono">
            {rejectedCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedFilter('ALL')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            selectedFilter === 'ALL'
              ? 'bg-slate-800 text-slate-200 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>All Spaces</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-400 font-mono">
            {spots.length}
          </span>
        </button>
      </div>

      {/* Spot Listings Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs">
          Loading parking listings from Supabase...
        </div>
      ) : filteredSpots.length === 0 ? (
        <div className="py-16 bg-slate-900 border border-slate-800 rounded-2xl text-center">
          <Building className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No Listings in this Category</h3>
          <p className="text-xs text-slate-500 mt-1">
            {selectedFilter === 'PENDING_APPROVAL'
              ? 'All submitted host parking spaces have been reviewed.'
              : 'Try selecting another tab or clearing your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredSpots.map((spot) => {
            const photoList = getPhotosList(spot);

            return (
              <div
                key={spot.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition hover:border-slate-700 flex flex-col lg:flex-row gap-6 justify-between"
              >
                {/* Spot Details Left Column */}
                <div className="flex-1 space-y-4">
                  {/* Status & ID */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {spot.id}
                    </span>
                    {spot.status === 'PENDING_APPROVAL' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> PENDING VERIFICATION
                      </span>
                    )}
                    {spot.status === 'ACTIVE' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> LIVE & BOOKABLE
                      </span>
                    )}
                    {spot.status === 'MODIFICATION_REQUESTED' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> CHANGES REQUESTED
                      </span>
                    )}
                    {spot.status === 'REJECTED' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> REJECTED
                      </span>
                    )}
                    {spot.status === 'PAUSED' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-300">
                        PAUSED BY HOST
                      </span>
                    )}
                  </div>

                  {/* Title & Address */}
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{spot.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{spot.address}, {spot.city}</span>
                      {spot.landmark && <span className="text-slate-500">({spot.landmark})</span>}
                    </div>
                  </div>

                  {/* Host & Rates Row */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Host</span>
                      <span className="font-semibold text-slate-200">{spot.hostName || 'Verified Host'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Rates</span>
                      <span className="font-bold text-emerald-400">₹{spot.hourlyRate}/hr</span>
                      <span className="text-slate-500 ml-1.5">(₹{spot.dailyRate}/day)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Clearance</span>
                      <span className="font-semibold text-slate-200">{spot.clearanceHeight || '8ft 0in'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Access Method</span>
                      <span className="font-semibold text-slate-200">{spot.accessMethod || 'SECURITY_GUARD'}</span>
                    </div>
                  </div>

                  {/* Amenities Pills */}
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    {spot.gated && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 flex items-center gap-1 border border-slate-700">
                        <Shield className="w-3 h-3 text-emerald-400" /> Gated Society
                      </span>
                    )}
                    {spot.cctvGuarded && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 flex items-center gap-1 border border-slate-700">
                        <Camera className="w-3 h-3 text-teal-400" /> 24/7 CCTV Guard
                      </span>
                    )}
                    {spot.evCharging && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 flex items-center gap-1 border border-slate-700">
                        <Zap className="w-3 h-3 text-cyan-400" /> EV Fast Charger
                      </span>
                    )}
                  </div>

                  {/* Feedback / Notes Banner if present */}
                  {spot.modificationNotes && (
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-xs text-orange-300">
                      <span className="font-bold uppercase tracking-wider text-[10px] block text-orange-400 mb-0.5">
                        Modification Request Note:
                      </span>
                      {spot.modificationNotes}
                    </div>
                  )}

                  {spot.rejectionReason && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300">
                      <span className="font-bold uppercase tracking-wider text-[10px] block text-red-400 mb-0.5">
                        Rejection Reason:
                      </span>
                      {spot.rejectionReason}
                    </div>
                  )}
                </div>

                {/* 4-Angle Photos & Actions Right Column */}
                <div className="lg:w-[420px] flex flex-col justify-between space-y-4">
                  {/* Photo Thumbnails */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        4-Angle Verification Photos ({photoList.length}/4)
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">Click to inspect</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {photoList.length > 0 ? (
                        photoList.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() =>
                              setPreviewPhoto({
                                url: photo.url,
                                label: photo.label || `Angle #${pIdx + 1}`,
                                spotTitle: spot.title,
                              })
                            }
                            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-emerald-500 cursor-pointer transition"
                          >
                            <img
                              src={photo.url}
                              alt={photo.label || 'Verification Photo'}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                            <span className="absolute bottom-1 left-1 right-1 bg-black/75 px-1 py-0.5 text-[8px] font-mono text-center text-slate-300 rounded truncate">
                              {photo.label || `#${pIdx + 1}`}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-4 p-4 text-center bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-500">
                          No verification photos attached.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Review Buttons */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                    {spot.status !== 'ACTIVE' && (
                      <button
                        onClick={() =>
                          setReviewModal({
                            spot,
                            action: 'APPROVE',
                          })
                        }
                        disabled={actionInProgress === spot.id}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve & Go Live</span>
                      </button>
                    )}

                    {spot.status !== 'MODIFICATION_REQUESTED' && (
                      <button
                        onClick={() =>
                          setReviewModal({
                            spot,
                            action: 'REQUEST_MODIFICATION',
                          })
                        }
                        disabled={actionInProgress === spot.id}
                        className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-orange-400 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition border border-orange-500/20"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Request Changes</span>
                      </button>
                    )}

                    {spot.status !== 'REJECTED' && (
                      <button
                        onClick={() =>
                          setReviewModal({
                            spot,
                            action: 'REJECT',
                          })
                        }
                        disabled={actionInProgress === spot.id}
                        className="px-3.5 py-2.5 bg-slate-800 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition border border-red-500/20"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">{previewPhoto.spotTitle}</h4>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">{previewPhoto.label}</p>
              </div>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-black flex items-center justify-center max-h-[75vh]">
              <img
                src={previewPhoto.url}
                alt={previewPhoto.label}
                className="max-h-[70vh] w-auto max-w-full rounded object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Review Confirmation / Feedback Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {reviewModal.action === 'APPROVE' && 'Approve Parking Listing'}
                {reviewModal.action === 'REQUEST_MODIFICATION' && 'Request Changes from Host'}
                {reviewModal.action === 'REJECT' && 'Reject Parking Listing'}
              </h3>
              <button
                onClick={() => setReviewModal(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Listing: <span className="font-semibold text-slate-200">{reviewModal.spot.title}</span> ({reviewModal.spot.address})
            </p>

            {reviewModal.action === 'APPROVE' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                Are you sure you want to approve this parking space? It will immediately go <span className="font-bold">LIVE & BOOKABLE</span> on the driver mobile app, and the host will receive a real-time push notification.
              </div>
            )}

            {reviewModal.action === 'REQUEST_MODIFICATION' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Action Required / Notes for Host:
                </label>
                <textarea
                  value={modificationNotes}
                  onChange={(e) => setModificationNotes(e.target.value)}
                  placeholder="e.g. Please re-upload a clear daytime photo of the bay front and confirm if full-size SUVs can turn in."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            {reviewModal.action === 'REJECT' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Select Rejection Reason:
                </label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-red-500"
                >
                  <option value="Society / RWA access permission not verified">Society / RWA access permission not verified</option>
                  <option value="Inaccessible curb cut or blocked entrance ramp">Inaccessible curb cut or blocked entrance ramp</option>
                  <option value="Clearance height below minimum safety threshold (7ft)">Clearance height below minimum safety threshold (7ft)</option>
                  <option value="Unclear verification angle photos submitted">Unclear verification angle photos submitted</option>
                  <option value="Commercial zoning restriction in residential locality">Commercial zoning restriction in residential locality</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setReviewModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleExecuteReview}
                disabled={actionInProgress === reviewModal.spot.id}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition ${
                  reviewModal.action === 'APPROVE'
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : reviewModal.action === 'REQUEST_MODIFICATION'
                    ? 'bg-orange-600 hover:bg-orange-500'
                    : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {actionInProgress === reviewModal.spot.id ? 'Processing...' : 'Confirm Decision'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
