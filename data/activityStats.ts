export interface ActiveDay {
  date: string;
  day: string;
  messages: number;
  highlight?: string;
}

export interface ActiveHour {
  hour: string;
  displayHour: string;
  messages: number;
  isPeak?: boolean;
}

export interface ActivityStats {
  mostActiveDay: ActiveDay;
  topActiveDays: ActiveDay[];
  peakHours: ActiveHour[];
  allHourlyDistribution: ActiveHour[];
}

export const activityStats: ActivityStats = {
  mostActiveDay: {
    date: "29 July 2026",
    day: "Wednesday",
    messages: 837,
    highlight: "Our longest, most unforgettable midnight conversation ✨",
  },
  topActiveDays: [
    {
      date: "29 July 2026",
      day: "Wednesday",
      messages: 837,
      highlight: "Midnight heart-to-heart talk 🌙",
    },
    {
      date: "9 March 2026",
      day: "Monday",
      messages: 742,
      highlight: "Where our love story began 💖",
    },
    {
      date: "14 Feb 2026",
      day: "Saturday",
      messages: 685,
      highlight: "Valentine's sweet confessions 🌹",
    },
    {
      date: "23 Aug 2026",
      day: "Sunday",
      messages: 624,
      highlight: "Non-stop laughing and sharing memes 😂",
    },
    {
      date: "12 Sept 2026",
      day: "Saturday",
      messages: 589,
      highlight: "Planning our little world together 🏡",
    },
    {
      date: "3 Oct 2026",
      day: "Saturday",
      messages: 541,
      highlight: "Countless sweet voice notes & love 💌",
    },
  ],
  peakHours: [
    { hour: "21:00", displayHour: "9 PM", messages: 9621, isPeak: true },
    { hour: "20:00", displayHour: "8 PM", messages: 6683 },
    { hour: "19:00", displayHour: "7 PM", messages: 5103 },
    { hour: "18:00", displayHour: "6 PM", messages: 4006 },
  ],
  allHourlyDistribution: [
    { hour: "00:00", displayHour: "12 AM", messages: 2640 },
    { hour: "01:00", displayHour: "1 AM", messages: 1420 },
    { hour: "02:00", displayHour: "2 AM", messages: 680 },
    { hour: "03:00", displayHour: "3 AM", messages: 210 },
    { hour: "04:00", displayHour: "4 AM", messages: 90 },
    { hour: "05:00", displayHour: "5 AM", messages: 120 },
    { hour: "06:00", displayHour: "6 AM", messages: 340 },
    { hour: "07:00", displayHour: "7 AM", messages: 890 },
    { hour: "08:00", displayHour: "8 AM", messages: 1450 },
    { hour: "09:00", displayHour: "9 AM", messages: 1680 },
    { hour: "10:00", displayHour: "10 AM", messages: 1940 },
    { hour: "11:00", displayHour: "11 AM", messages: 2180 },
    { hour: "12:00", displayHour: "12 PM", messages: 2450 },
    { hour: "13:00", displayHour: "1 PM", messages: 2690 },
    { hour: "14:00", displayHour: "2 PM", messages: 2210 },
    { hour: "15:00", displayHour: "3 PM", messages: 2380 },
    { hour: "16:00", displayHour: "4 PM", messages: 2540 },
    { hour: "17:00", displayHour: "5 PM", messages: 2890 },
    { hour: "18:00", displayHour: "6 PM", messages: 4006 },
    { hour: "19:00", displayHour: "7 PM", messages: 5103 },
    { hour: "20:00", displayHour: "8 PM", messages: 6683 },
    { hour: "21:00", displayHour: "9 PM", messages: 9621, isPeak: true },
    { hour: "22:00", displayHour: "10 PM", messages: 3840 },
    { hour: "23:00", displayHour: "11 PM", messages: 3210 },
  ],
};
