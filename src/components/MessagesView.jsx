import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Building2, 
  CheckCheck, 
  Clock, 
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';

export default function MessagesView({
  currentUser,
  allUsers,
  messages,
  onSendMessage,
  selectedChatUserId,
  setSelectedChatUserId
}) {
  const [inputText, setInputText] = useState('');

  // Determine all conversation partners
  const myMessages = messages.filter(m => 
    m.senderId === currentUser.id || m.receiverId === currentUser.id
  );

  const conversationUserIds = Array.from(new Set(
    myMessages.map(m => m.senderId === currentUser.id ? m.receiverId : m.senderId)
  ));

  // If a partner is pre-selected, ensure they are in the list
  if (selectedChatUserId && !conversationUserIds.includes(selectedChatUserId)) {
    conversationUserIds.unshift(selectedChatUserId);
  }

  // Active chat partner
  const activePartnerId = selectedChatUserId || (conversationUserIds.length > 0 ? conversationUserIds[0] : null);
  const activePartner = allUsers.find(u => u.id === activePartnerId) || {
    id: activePartnerId,
    name: 'Recruiter / Candidate',
    role: currentUser.role === 'hr' ? 'candidate' : 'hr',
    title: 'Skill Specialist'
  };

  // Messages with active partner
  const activeThread = messages.filter(m => 
    (m.senderId === currentUser.id && m.receiverId === activePartnerId) ||
    (m.senderId === activePartnerId && m.receiverId === currentUser.id)
  );

  // Quick message templates
  const quickTemplates = currentUser.role === 'hr' ? [
    "Hello! We reviewed your profile and want to schedule an interview.",
    "Could you please share your previous work experience certificates?",
    "Are you available to join immediately for our facility in Andheri?",
    "Congratulations! We are pleased to offer you the position."
  ] : [
    "Thank you for reaching out! Yes, I am available for the interview.",
    "I have 3+ years experience with industrial floor scrubbers & machines.",
    "Yes, I can bring my Aadhaar, bank passbook, and certificate copies.",
    "I am ready to join immediately on full-time shifts."
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activePartnerId) return;

    onSendMessage(currentUser.id, activePartnerId, text);
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        
        {/* Left: Conversations Sidebar */}
        <div className="md:col-span-4 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Direct Messages ({conversationUserIds.length})
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Chat directly between Recruiters & Job Seekers</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversationUserIds.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active conversations yet. Start a conversation from the Jobs or Talent Directory!
              </div>
            ) : (
              conversationUserIds.map(uid => {
                const partner = allUsers.find(u => u.id === uid) || { id: uid, name: 'Contact', role: 'candidate' };
                const isSelected = uid === activePartnerId;

                // Find last message
                const thread = messages.filter(m => 
                  (m.senderId === currentUser.id && m.receiverId === uid) ||
                  (m.senderId === uid && m.receiverId === currentUser.id)
                );
                const lastMsg = thread[thread.length - 1];

                return (
                  <div
                    key={uid}
                    onClick={() => setSelectedChatUserId(uid)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    {partner.avatar ? (
                      <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full object-cover border" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {partner.name.charAt(0)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-bold text-slate-900 text-xs truncate">{partner.name}</h4>
                        {lastMsg && (
                          <span className="text-[10px] text-slate-400">
                            {new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {partner.company || partner.title || (partner.role === 'hr' ? 'HR Recruiter' : 'Candidate')}
                      </p>
                      {lastMsg && (
                        <p className="text-[11px] text-slate-600 truncate mt-1">
                          {lastMsg.senderId === currentUser.id ? 'You: ' : ''}{lastMsg.text}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div className="md:col-span-8 flex flex-col justify-between h-[640px]">
          {activePartnerId ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  {activePartner.avatar ? (
                    <img src={activePartner.avatar} alt={activePartner.name} className="w-10 h-10 rounded-full object-cover border" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {activePartner.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-slate-900 text-sm">{activePartner.name}</h3>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        activePartner.role === 'hr' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {activePartner.role === 'hr' ? 'HR Recruiter' : 'Candidate'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {activePartner.company || activePartner.title || activePartner.location}
                    </p>
                  </div>
                </div>

                {activePartner.phone && (
                  <a
                    href={`tel:${activePartner.phone}`}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center gap-1 text-xs font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call</span>
                  </a>
                )}
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
                {activeThread.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Start the conversation! Tap one of the quick message templates below or type a custom note.
                  </div>
                ) : (
                  activeThread.map(msg => {
                    const isMe = msg.senderId === currentUser.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl p-3.5 text-xs shadow-sm leading-relaxed ${
                            isMe 
                              ? 'bg-blue-600 text-white rounded-br-none' 
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div className={`text-[9px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Quick Template Chips */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Quick:</span>
                {quickTemplates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(tmpl)}
                    className="text-[11px] font-medium bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg shrink-0 transition-colors"
                  >
                    {tmpl}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder={`Message ${activePartner.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a conversation to start messaging
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
