import { User } from '../types';

export const generateInitialData = async (): Promise<{ users: User[], emails: any[], messages: any[] }> => {
  // Simulate a short loading delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));
  return getStaticMockData();
};

function getStaticMockData() {
  return {
    users: [
      { id: 'u1', name: 'G. Maxwell', email: 'ghislaine@terra.com', phone: '+1 (212) 555-0199', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { id: 'u2', name: 'Prince Andrew', email: 'andrew@windsor.uk', phone: '+44 20 7930 4832', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 'u3', name: 'Les Wexner', email: 'l.wexner@lbrands.com', phone: '+1 (614) 555-0123', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'u4', name: 'Alan Dershowitz', email: 'alan.d@law.harvard.edu', phone: '+1 (617) 555-0188', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
      { id: 'usdoj', name: 'U.S. Department of Justice', email: 'EFTA@usdoj.gov', phone: '', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Seal_of_the_United_States_Department_of_Justice.svg/1024px-Seal_of_the_United_States_Department_of_Justice.svg.png' }
    ],
    emails: [
      { senderId: 'usdoj', subject: 'DOJ Disclosures: Privacy Notice & Data Sets', body: `In view of the Congressional deadline, all reasonable efforts have been made to review and redact personal information pertaining to victims, other private individuals, and protect sensitive materials from disclosure.\n\nThat said, because of the volume of information involved, this website may nevertheless contain information that inadvertently includes non-public personally identifiable information or other sensitive content, to include matters of a sexual nature.\n\nIn the event a member of the public identifies any information that should not have been posted, please notify us immediately by email at EFTA@usdoj.gov so we can take steps to correct the problem as soon as possible.\n\nRedactions of victim names and other identifying information have been applied. In audio files, redactions of victim names and other identifying information have been implemented through the use of a steady, solid tone.`, timeOffsetMinutes: 10, isRead: false },
      { senderId: 'u1', subject: 'Flight Manifest - Nov 12', body: "Jeffrey,\n\nAttached is the guest list for the flight to Little St. James tomorrow. Please verify the names. We have the usual crew plus the two professors from MIT.\n\nEverything is set for arrival.\n\n- G", timeOffsetMinutes: 120, isRead: false },
      { senderId: 'u3', subject: 'Trust Fund Transfer', body: "The transfer of the property rights for the 71st street mansion has been completed. My attorneys will send over the final documents for your signature. \n\nLet's discuss the other matter when you are in Ohio.", timeOffsetMinutes: 300, isRead: true },
      { senderId: 'u4', subject: 'Legal Strategy', body: "I've reviewed the complaint. It's meritless. We should move to dismiss immediately. I'll draft the motion this weekend. Call me when you get this.", timeOffsetMinutes: 1440, isRead: true },
      { senderId: 'u2', subject: 'Weekend in the country', body: "Looking forward to seeing you. The hunting lodge is prepared. Will you be bringing guests?", timeOffsetMinutes: 2880, isRead: true }
    ],
    messages: [
      {
        participantId: 'u1',
        history: [
          { text: "Did you speak to him about the donation?", isMe: true, timeOffsetMinutes: 60 },
          { text: "Yes, he is hesitant but I think he will come around.", isMe: false, timeOffsetMinutes: 55 },
          { text: "Good. We need that sorted before the gala.", isMe: true, timeOffsetMinutes: 50 },
          { text: "I'll handle it. Don't worry.", isMe: false, timeOffsetMinutes: 45 }
        ]
      },
      {
        participantId: 'u2',
        history: [
            { text: "Are we still on for London next week?", isMe: false, timeOffsetMinutes: 15 },
            { text: "Yes, landing Tuesday morning.", isMe: true, timeOffsetMinutes: 5 }
        ]
      }
    ]
  };
}