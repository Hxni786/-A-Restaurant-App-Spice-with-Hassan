import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Dimensions,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

const { width } = Dimensions.get("window");

const LOGO = "https://i.postimg.cc/YSB7xK6v/logo.png";
const EASYPAISA = "https://i.postimg.cc/C5XXLkJB/Easypaisa-logo.png";
const JAZZCASH = "https://i.postimg.cc/fLpQkGRm/new-Jazzcash-logo.png";

const MENU = [
  {
    cat: "Starters",
    icon: "🥗",
    color: "#27AE60",
    items: [
      {
        id: 1,
        name: "Samosa Platter",
        price: 350,
        rating: 4.8,
        desc: "Crispy pastry filled with spiced potatoes & peas. Served with mint & tamarind chutneys.",
        img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=70",
        tag: "Bestseller",
        spice: 2,
        time: "10 min",
        cal: 280,
      },
      {
        id: 2,
        name: "Seekh Kebab",
        price: 750,
        rating: 4.9,
        desc: "Minced lamb & beef with aromatic herbs, char-grilled on iron skewers.",
        img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&q=70",
        tag: "Chef's Pick",
        spice: 3,
        time: "15 min",
        cal: 420,
      },
      {
        id: 3,
        name: "Paneer Tikka",
        price: 650,
        rating: 4.7,
        desc: "Cottage cheese marinated in spiced yogurt, charred in the tandoor.",
        img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&q=70",
        tag: "Veg",
        spice: 2,
        time: "12 min",
        cal: 310,
      },
    ],
  },
  {
    cat: "Main Course",
    icon: "🍛",
    color: "#C0392B",
    items: [
      {
        id: 4,
        name: "Chicken Biryani",
        price: 950,
        rating: 5.0,
        desc: "Fragrant basmati rice with tender chicken, saffron & whole spices.",
        img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&q=70",
        tag: "Signature",
        spice: 3,
        time: "25 min",
        cal: 680,
      },
      {
        id: 5,
        name: "Butter Chicken",
        price: 1100,
        rating: 4.9,
        desc: "Succulent chicken in a velvety tomato-cream sauce.",
        img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&q=70",
        tag: "Bestseller",
        spice: 1,
        time: "20 min",
        cal: 520,
      },
      {
        id: 6,
        name: "Lamb Karahi",
        price: 1400,
        rating: 4.8,
        desc: "Slow-cooked lamb with tomatoes, ginger & green chillies in karahi.",
        img: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=300&q=70",
        tag: "Popular",
        spice: 4,
        time: "30 min",
        cal: 590,
      },
      {
        id: 7,
        name: "Dal Makhani",
        price: 700,
        rating: 4.7,
        desc: "Black lentils slow-cooked overnight with butter & cream.",
        img: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=300&q=70",
        tag: "Veg",
        spice: 1,
        time: "20 min",
        cal: 390,
      },
    ],
  },
  {
    cat: "BBQ & Grill",
    icon: "🔥",
    color: "#E67E22",
    items: [
      {
        id: 8,
        name: "Mixed Grill Platter",
        price: 2200,
        rating: 4.9,
        desc: "Grand platter of kebab, tikka, boti & chops. Perfect for sharing.",
        img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&q=70",
        tag: "For 2",
        spice: 3,
        time: "30 min",
        cal: 1200,
      },
      {
        id: 9,
        name: "Lahori Chops",
        price: 1800,
        rating: 4.8,
        desc: "Lamb chops in fiery Lahori spice blend grilled over open flame.",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70",
        tag: "Spicy",
        spice: 5,
        time: "25 min",
        cal: 650,
      },
    ],
  },
  {
    cat: "Breads",
    icon: "🫓",
    color: "#8B6914",
    items: [
      {
        id: 10,
        name: "Garlic Naan",
        price: 120,
        rating: 4.8,
        desc: "Soft leavened bread brushed with garlic butter, baked in tandoor.",
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=70",
        tag: "Popular",
        spice: 0,
        time: "8 min",
        cal: 180,
      },
      {
        id: 11,
        name: "Roghni Naan",
        price: 130,
        rating: 4.7,
        desc: "Buttery flatbread with sesame & nigella seeds, brushed with ghee.",
        img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&q=70",
        tag: "Classic",
        spice: 0,
        time: "8 min",
        cal: 195,
      },
    ],
  },
  {
    cat: "Drinks",
    icon: "🥤",
    color: "#8E44AD",
    items: [
      {
        id: 12,
        name: "Mango Lassi",
        price: 280,
        rating: 4.9,
        desc: "Chilled yogurt blended with fresh mangoes, cardamom & rose.",
        img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&q=70",
        tag: "Seasonal",
        spice: 0,
        time: "5 min",
        cal: 220,
      },
      {
        id: 13,
        name: "Masala Chai",
        price: 150,
        rating: 4.8,
        desc: "Spiced tea with ginger, cardamom, cinnamon & whole milk.",
        img: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=300&q=70",
        tag: "Classic",
        spice: 1,
        time: "5 min",
        cal: 120,
      },
    ],
  },
  {
    cat: "Desserts",
    icon: "🍮",
    color: "#D4AC0D",
    items: [
      {
        id: 14,
        name: "Gulab Jamun",
        price: 320,
        rating: 4.9,
        desc: "Milk-solid dumplings in rose & cardamom sugar syrup. Served warm.",
        img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&q=70",
        tag: "Bestseller",
        spice: 0,
        time: "5 min",
        cal: 380,
      },
      {
        id: 15,
        name: "Kheer",
        price: 280,
        rating: 4.7,
        desc: "Creamy rice pudding with saffron, pistachios & silver leaf.",
        img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=70",
        tag: "Traditional",
        spice: 0,
        time: "5 min",
        cal: 310,
      },
    ],
  },
];

const TABLES = [
  { id: "T01", seats: 2, status: "free", section: "Window" },
  {
    id: "T02",
    seats: 4,
    status: "reserved",
    section: "Window",
    by: "Ali Khan",
    time: "7:30 PM",
  },
  { id: "T03", seats: 4, status: "occupied", section: "Window" },
  { id: "T04", seats: 6, status: "free", section: "Center" },
  {
    id: "T05",
    seats: 6,
    status: "reserved",
    section: "Center",
    by: "Sara Ahmed",
    time: "8:00 PM",
  },
  { id: "T06", seats: 8, status: "occupied", section: "Center" },
  { id: "T07", seats: 2, status: "free", section: "Garden" },
  { id: "T08", seats: 4, status: "free", section: "Garden" },
  { id: "T09", seats: 10, status: "free", section: "Private", premium: true },
  {
    id: "T10",
    seats: 6,
    status: "reserved",
    section: "Private",
    by: "Corp Event",
    time: "9:00 PM",
    premium: true,
  },
  { id: "T11", seats: 8, status: "free", section: "Rooftop", premium: true },
  {
    id: "T12",
    seats: 4,
    status: "occupied",
    section: "Rooftop",
    premium: true,
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Ayesha K.",
    av: "👩",
    rating: 5,
    date: "Feb 2025",
    dish: "Chicken Biryani",
    text: "Absolutely divine! The biryani was fragrant and perfectly spiced. Best in Lahore, hands down!",
  },
  {
    id: 2,
    name: "Omar S.",
    av: "👨",
    rating: 5,
    date: "Jan 2025",
    dish: "Mixed Grill Platter",
    text: "Exceptional quality. Every kebab was juicy and perfectly cooked. Worth every rupee!",
  },
  {
    id: 3,
    name: "Fatima R.",
    av: "🧕",
    rating: 4,
    date: "Jan 2025",
    dish: "Butter Chicken",
    text: "Rich, creamy and deeply flavourful. The garlic naan with it was heavenly.",
  },
  {
    id: 4,
    name: "Hassan M.",
    av: "🧔",
    rating: 5,
    date: "Dec 2024",
    dish: "Lamb Karahi",
    text: "Authentic flavours that remind me of home. The karahi had perfect char and smokiness.",
  },
  {
    id: 5,
    name: "Zara T.",
    av: "👱‍♀️",
    rating: 4,
    date: "Dec 2024",
    dish: "Gulab Jamun",
    text: "The desserts are something else. Gulab jamun was warm, soft and perfectly rose-scented.",
  },
];

const TAG_COLORS = {
  Bestseller: "#FF6B35",
  "Chef's Pick": "#8E44AD",
  Veg: "#27AE60",
  Signature: "#C0392B",
  New: "#2980B9",
  Popular: "#E67E22",
  Classic: "#7F8C8D",
  Seasonal: "#16A085",
  Spicy: "#C0392B",
  "For 2": "#8E44AD",
  Traditional: "#E74C3C",
};

const STATUS_COLOR = {
  free: "#27AE60",
  reserved: "#F0B429",
  occupied: "#C0392B",
};

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
const Chili = ({ n }) => (
  <View style={{ flexDirection: "row", gap: 1 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Text key={i} style={{ fontSize: 9, opacity: i <= n ? 1 : 0.18 }}>
        🌶️
      </Text>
    ))}
  </View>
);

const Stars = ({ n, size = 12 }) => (
  <Text style={{ color: "#F0B429", fontSize: size }}>
    {"★".repeat(Math.floor(n))}
    {"☆".repeat(5 - Math.floor(n))}
  </Text>
);

const Badge = ({ label }) => (
  <View
    style={{
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 7,
      backgroundColor: `${TAG_COLORS[label] || "#555"}22`,
      borderWidth: 1,
      borderColor: `${TAG_COLORS[label] || "#555"}44`,
    }}
  >
    <Text
      style={{
        fontSize: 9,
        fontWeight: "700",
        color: TAG_COLORS[label] || "#aaa",
      }}
    >
      {label}
    </Text>
  </View>
);

const PrimaryBtn = ({ children, onPress, disabled, style = {} }) => (
  <TouchableOpacity
    onPress={disabled ? null : onPress}
    disabled={disabled}
    activeOpacity={0.8}
    style={[
      {
        backgroundColor: disabled
          ? "rgba(255,107,53,0.35)"
          : "#FF6B35",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: disabled ? "transparent" : "#FF6B35",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: disabled ? 0 : 0.38,
        shadowRadius: 18,
        elevation: disabled ? 0 : 5,
      },
      style,
    ]}
  >
    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>
      {children}
    </Text>
  </TouchableOpacity>
);

const OutlineBtn = ({ children, onPress, style = {} }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      {
        backgroundColor: "transparent",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "rgba(255,107,53,0.5)",
      },
      style,
    ]}
  >
    <Text style={{ color: "#FF6B35", fontWeight: "700", fontSize: 14 }}>
      {children}
    </Text>
  </TouchableOpacity>
);

const GhostBtn = ({ children, onPress, style = {} }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      {
        backgroundColor: "rgba(255,248,240,0.06)",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
      },
      style,
    ]}
  >
    <Text style={{ color: "#FFF8F0", fontWeight: "600", fontSize: 13 }}>
      {children}
    </Text>
  </TouchableOpacity>
);

// ─── SPLASH ───────────────────────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  const [p, setP] = useState(0);
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 28000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const timers = [
      setTimeout(() => setP(1), 350),
      setTimeout(() => setP(2), 1100),
      setTimeout(onDone, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0D0500",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar hidden />

      {/* Rings */}
      <Animated.View
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderWidth: 1,
          borderColor: "rgba(255,107,53,0.08)",
          borderRadius: 160,
          transform: [{ rotate: spin }],
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 230,
          height: 230,
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: "rgba(255,107,53,0.05)",
          borderRadius: 115,
        }}
      />

      {/* Dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: i % 2 ? "#FF6B35" : "#F0B429",
            opacity: p >= 1 ? 0.55 : 0,
            top: `${30 + Math.sin((i * Math.PI) / 3) * 28}%`,
            left: `${50 + Math.cos((i * Math.PI) / 3) * 30}%`,
          }}
        />
      ))}

      {/* Logo */}
      <Animated.View
        style={{
          opacity: p >= 1 ? 1 : 0,
          transform: [
            { scale: p >= 1 ? 1 : 0.4 },
          ],
          marginBottom: 28,
        }}
      >
        <View
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            backgroundColor: "rgba(255,107,53,0.1)",
            borderWidth: 2,
            borderColor: "rgba(255,107,53,0.3)",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Image
            source={{ uri: LOGO }}
            style={{ width: "100%", height: "100%", borderRadius: 65 }}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {/* Name */}
      <Animated.View
        style={{
          opacity: p >= 2 ? 1 : 0,
          transform: [{ translateY: p >= 2 ? 0 : 22 }],
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 46,
            fontWeight: "900",
            color: "#FFF8F0",
          }}
        >
          Spice
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: "#FF6B35",
            letterSpacing: 9,
            textTransform: "uppercase",
            marginVertical: 6,
          }}
        >
          with
        </Text>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 46,
            fontWeight: "900",
            color: "#FF6B35",
          }}
        >
          Hassan
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: "rgba(255,248,240,0.3)",
            letterSpacing: 4,
            marginTop: 14,
          }}
        >
          AUTHENTIC PAKISTANI CUISINE
        </Text>
      </Animated.View>

      {/* Progress */}
      <View
        style={{
          position: "absolute",
          bottom: 55,
          width: 130,
          opacity: p >= 2 ? 1 : 0,
        }}
      >
        <View
          style={{
            height: 2,
            backgroundColor: "rgba(255,255,255,0.07)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#FF6B35",
              transform: [{ scaleX: p / 2 }],
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 9,
            color: "rgba(255,248,240,0.22)",
            marginTop: 7,
            letterSpacing: 4,
          }}
        >
          LOADING
        </Text>
      </View>
    </View>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fc, setFc] = useState("");
  const [loading, setLoading] = useState(false);
  const [showP, setShowP] = useState(false);
  const [err, setErr] = useState("");

  const submit = () => {
    if (!email || !pass) {
      setErr("Please fill all required fields.");
      return;
    }
    if (tab === "register" && (!name || !phone)) {
      setErr("Please fill all required fields.");
      return;
    }
    setErr("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1400);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: "#0D0500" }}
      >
        <View
          style={{
            minHeight: "100%",
            padding: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatusBar barStyle="light-content" />

          {/* Decorative circles */}
          <View
            style={{
              position: "absolute",
              top: -180,
              right: -180,
              width: 420,
              height: 420,
              borderRadius: 210,
              backgroundColor: "rgba(255,107,53,0.07)",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -160,
              left: -160,
              width: 380,
              height: 380,
              borderRadius: 190,
              backgroundColor: "rgba(184,58,32,0.05)",
            }}
          />

          {/* Logo */}
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <View
              style={{
                width: 74,
                height: 74,
                borderRadius: 37,
                backgroundColor: "rgba(255,107,53,0.12)",
                borderWidth: 1.5,
                borderColor: "rgba(255,107,53,0.28)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
                padding: 7,
                shadowColor: "#FF6B35",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.25,
                shadowRadius: 28,
                elevation: 10,
              }}
            >
              <Image
                source={{ uri: LOGO }}
                style={{ width: "100%", height: "100%", borderRadius: 37 }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                fontSize: 26,
                fontWeight: "700",
                color: "#FFF8F0",
              }}
            >
              Spice with Hassan
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "rgba(255,248,240,0.38)",
                letterSpacing: 4,
                marginTop: 4,
              }}
            >
              AUTHENTIC FLAVOURS
            </Text>
          </View>

          {/* Card */}
          <View
            style={{
              width: "100%",
              maxWidth: 370,
              backgroundColor: "rgba(255,248,240,0.03)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.06)",
              borderRadius: 22,
              padding: 26,
            }}
          >
            {/* Tabs */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(255,248,240,0.04)",
                borderRadius: 11,
                padding: 3,
                marginBottom: 22,
              }}
            >
              {[
                ["login", "Sign In"],
                ["register", "Sign Up"],
              ].map(([t, l]) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTab(t)}
                  style={{
                    flex: 1,
                    paddingVertical: 9,
                    borderRadius: 9,
                    backgroundColor:
                      tab === t ? "#FF6B35" : "transparent",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: tab === t ? "#fff" : "rgba(255,248,240,0.42)",
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {err !== "" && (
              <View
                style={{
                  backgroundColor: "rgba(192,57,43,0.13)",
                  borderWidth: 1,
                  borderColor: "rgba(192,57,43,0.35)",
                  borderRadius: 9,
                  padding: 9,
                  marginBottom: 14,
                }}
              >
                <Text style={{ fontSize: 13, color: "#ff8a80" }}>{err}</Text>
              </View>
            )}

            <View style={{ gap: 13 }}>
              {tab === "register" && (
                <>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(255,248,240,0.38)",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Full Name
                    </Text>
                    <TextInput
                      placeholder="Hassan Ahmed"
                      placeholderTextColor="rgba(255,248,240,0.3)"
                      value={name}
                      onChangeText={setName}
                      onFocus={() => setFc("name")}
                      onBlur={() => setFc("")}
                      style={{
                        width: "100%",
                        padding: 13,
                        borderRadius: 12,
                        borderWidth: 1.5,
                        borderColor: fc === "name" ? "#FF6B35" : "rgba(255,248,240,0.07)",
                        backgroundColor: "rgba(255,248,240,0.04)",
                        color: "#FFF8F0",
                        fontSize: 14,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(255,248,240,0.38)",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Phone
                    </Text>
                    <TextInput
                      placeholder="+92 300 0000000"
                      placeholderTextColor="rgba(255,248,240,0.3)"
                      value={phone}
                      onChangeText={setPhone}
                      onFocus={() => setFc("phone")}
                      onBlur={() => setFc("")}
                      keyboardType="phone-pad"
                      style={{
                        width: "100%",
                        padding: 13,
                        borderRadius: 12,
                        borderWidth: 1.5,
                        borderColor: fc === "phone" ? "#FF6B35" : "rgba(255,248,240,0.07)",
                        backgroundColor: "rgba(255,248,240,0.04)",
                        color: "#FFF8F0",
                        fontSize: 14,
                      }}
                    />
                  </View>
                </>
              )}
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(255,248,240,0.38)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Email
                </Text>
                <TextInput
                  placeholder="you@example.com"
                  placeholderTextColor="rgba(255,248,240,0.3)"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFc("email")}
                  onBlur={() => setFc("")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    width: "100%",
                    padding: 13,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: fc === "email" ? "#FF6B35" : "rgba(255,248,240,0.07)",
                    backgroundColor: "rgba(255,248,240,0.04)",
                    color: "#FFF8F0",
                    fontSize: 14,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(255,248,240,0.38)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Password
                </Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    secureTextEntry={!showP}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255,248,240,0.3)"
                    value={pass}
                    onChangeText={setPass}
                    onFocus={() => setFc("pass")}
                    onBlur={() => setFc("")}
                    style={{
                      width: "100%",
                      padding: 13,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: fc === "pass" ? "#FF6B35" : "rgba(255,248,240,0.07)",
                      backgroundColor: "rgba(255,248,240,0.04)",
                      color: "#FFF8F0",
                      fontSize: 14,
                      paddingRight: 44,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowP(!showP)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: 12,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "rgba(255,248,240,0.45)" }}>
                      {showP ? "👁️" : "🔒"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {tab === "login" && (
                <View style={{ alignItems: "flex-end", marginTop: -6 }}>
                  <TouchableOpacity onPress={() => Alert.alert("Reset Password", "Password reset link sent to your email")}>
                    <Text style={{ fontSize: 12, color: "#FF6B35" }}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <PrimaryBtn
                onPress={submit}
                disabled={loading}
                style={{ marginTop: 2 }}
              >
                {loading
                  ? "Please wait..."
                  : tab === "login"
                    ? "Sign In →"
                    : "Create Account →"}
              </PrimaryBtn>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 18,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "rgba(255,248,240,0.07)" }} />
              <Text style={{ fontSize: 11, color: "rgba(255,248,240,0.28)" }}>
                or continue with
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: "rgba(255,248,240,0.07)" }} />
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {["🔵 Google", "📘 Facebook"].map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => Alert.alert("Coming Soon", "Social login will be available soon!")}
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: "rgba(255,248,240,0.03)",
                    borderWidth: 1,
                    borderColor: "rgba(255,248,240,0.07)",
                    borderRadius: 11,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "rgba(255,248,240,0.6)", fontSize: 12 }}>
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity onPress={onLogin} style={{ marginTop: 18 }}>
            <Text
              style={{
                fontSize: 12,
                color: "rgba(255,248,240,0.3)",
                borderBottomWidth: 1,
                borderBottomStyle: "dashed",
                borderBottomColor: "rgba(255,248,240,0.18)",
                paddingBottom: 2,
              }}
            >
              Continue as Guest →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
const HomeTab = ({ menuData, onMenu, onTable, cartCount, onCart }) => {
  const featured = menuData.flatMap((c) => c.items)
    .filter((i) => i.rating >= 4.9)
    .slice(0, 4);
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0D0500" }} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View
        style={{
          backgroundColor: "#2C1000",
          paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 50) : 90,
          paddingHorizontal: 22,
          paddingBottom: 34,
          position: "relative",
        }}
      >
        {cartCount > 0 && (
          <TouchableOpacity
            onPress={onCart}
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              backgroundColor: "#FF6B35",
              borderRadius: 14,
              paddingVertical: 8,
              paddingHorizontal: 14,
              shadowColor: "#FF6B35",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.45,
              shadowRadius: 16,
              elevation: 5,
              zIndex: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
              🛒 {cartCount}
            </Text>
          </TouchableOpacity>
        )}
        <View>
          <Text
            style={{
              fontSize: 11,
              color: "#FF6B35",
              letterSpacing: 5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
              fontSize: 40,
              fontWeight: "900",
              lineHeight: 42,
              color: "#FFF8F0",
              marginBottom: 8,
            }}
          >
            Spice with
            {"\n"}
            <Text style={{ color: "#FF6B35" }}>Hassan</Text>
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255,248,240,0.42)",
              marginBottom: 22,
            }}
          >
            Authentic Pakistani cuisine since 1998
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <PrimaryBtn onPress={onMenu} style={{ paddingHorizontal: 22 }}>
              Explore Menu
            </PrimaryBtn>
            <OutlineBtn onPress={onTable} style={{ paddingHorizontal: 18 }}>
              Scan Table 📱
            </OutlineBtn>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 28 }}>
          {[
            ["4.9★", "Rating"],
            ["50+", "Dishes"],
            ["1998", "Est."],
            ["10k+", "Guests"],
          ].map(([v, l]) => (
            <View
              key={l}
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "rgba(255,248,240,0.04)",
                borderRadius: 12,
                paddingVertical: 10,
                paddingHorizontal: 4,
                borderWidth: 1,
                borderColor: "rgba(255,107,53,0.1)",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "900", color: "#FF6B35" }}>
                {v}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "rgba(255,248,240,0.32)",
                  marginTop: 2,
                }}
              >
                {l}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Categories */}
      <View style={{ paddingHorizontal: 22, paddingTop: 22 }}>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 22,
            fontWeight: "700",
            color: "#FFF8F0",
            marginBottom: 14,
          }}
        >
          Categories
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 9,
          }}
        >
          {menuData.map((cat) => (
            <TouchableOpacity
              key={cat.cat}
              onPress={() => Alert.alert(cat.cat, `${cat.items.length} items available`)}
              style={{
                width: (width - 62) / 3,
                backgroundColor: cat.color + "18",
                borderWidth: 1,
                borderColor: cat.color + "28",
                borderRadius: 15,
                paddingVertical: 14,
                paddingHorizontal: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 5 }}>{cat.icon}</Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "rgba(255,248,240,0.8)",
                }}
              >
                {cat.cat}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "rgba(255,248,240,0.3)",
                  marginTop: 2,
                }}
              >
                {cat.items.length} items
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured */}
      <View style={{ padding: 22 }}>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 22,
            fontWeight: "700",
            color: "#FFF8F0",
            marginBottom: 14,
          }}
        >
          ⭐ Featured
        </Text>
        {featured.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.05)",
              borderRadius: 18,
              marginBottom: 11,
              flexDirection: "row",
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.img }}
              style={{
                width: 96,
                height: 96,
              }}
              resizeMode="cover"
            />
            <View style={{ padding: 11, flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 4,
                  gap: 8,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#FFF8F0" }}>
                  {item.name}
                </Text>
                <Badge label={item.tag} />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: "rgba(255,248,240,0.4)",
                  marginBottom: 6,
                  lineHeight: 14,
                }}
              >
                {item.desc.slice(0, 55)}...
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "900", color: "#FF6B35" }}>
                  Rs {item.price.toLocaleString()}
                </Text>
                <Text style={{ fontSize: 11, color: "#F0B429" }}>
                  ★ {item.rating}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Promo banner */}
      <TouchableOpacity
        onPress={() => Alert.alert("Friday BBQ Night", "20% off on all BBQ items this Friday!")}
        style={{
          marginHorizontal: 22,
          marginBottom: 28,
          backgroundColor: "#FF6B35",
          borderRadius: 20,
          padding: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            position: "absolute",
            right: -15,
            top: -15,
            fontSize: 80,
            opacity: 0.12,
          }}
        >
          🌶️
        </Text>
        <Text
          style={{
            fontSize: 10,
            letterSpacing: 3,
            marginBottom: 4,
            color: "#fff",
            opacity: 0.8,
          }}
        >
          LIMITED TIME
        </Text>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 20,
            fontWeight: "700",
            color: "#fff",
            marginBottom: 4,
          }}
        >
          Friday BBQ Night
        </Text>
        <Text style={{ fontSize: 13, color: "#fff", opacity: 0.8, marginBottom: 14 }}>
          20% off all BBQ items every Friday
        </Text>
        <GhostBtn onPress={() => Alert.alert("Coming Soon", "Order now feature coming soon!")} style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          Order Now →
        </GhostBtn>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ─── MENU TAB ─────────────────────────────────────────────────────────────────
const MenuTab = ({ menuData, cart, onAdd, onRem, onDetail, cartCount, onCart }) => {
  const [ac, setAc] = useState(0);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("default");
  const all = menuData.flatMap((c) => c.items);
  const base = q
    ? all.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()))
    : (menuData[ac]?.items || []);
  const items = [...base].sort((a, b) =>
    sort === "price_asc"
      ? a.price - b.price
      : sort === "price_desc"
        ? b.price - a.price
        : sort === "rating"
          ? b.rating - a.rating
          : 0,
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0500" }}>
      <View
        style={{
          backgroundColor: "#1E0A00",
          paddingHorizontal: 18,
          paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 35) : 70,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,107,53,0.08)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
              fontSize: 24,
              fontWeight: "700",
              color: "#FFF8F0",
            }}
          >
            Our Menu
          </Text>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                const orders = ["default", "rating", "price_asc", "price_desc"];
                const next = orders[(orders.indexOf(sort) + 1) % orders.length];
                setSort(next);
              }}
              style={{
                backgroundColor: "rgba(255,248,240,0.05)",
                borderWidth: 1,
                borderColor: "rgba(255,107,53,0.18)",
                borderRadius: 10,
                paddingVertical: 6,
                paddingHorizontal: 9,
              }}
            >
              <Text style={{ color: "rgba(255,248,240,0.65)", fontSize: 11 }}>
                {sort === "default" ? "Sort" : 
                 sort === "rating" ? "Top Rated" :
                 sort === "price_asc" ? "Price ↑" : "Price ↓"}
              </Text>
            </TouchableOpacity>
            {cartCount > 0 && (
              <TouchableOpacity
                onPress={onCart}
                style={{
                  backgroundColor: "#FF6B35",
                  borderRadius: 11,
                  paddingVertical: 7,
                  paddingHorizontal: 11,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
                  🛒 {cartCount}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ position: "relative", marginBottom: 11 }}>
          <Text style={{ position: "absolute", left: 11, top: 11, opacity: 0.38, zIndex: 1 }}>
            🔍
          </Text>
          <TextInput
            placeholder="Search dishes..."
            placeholderTextColor="rgba(255,248,240,0.3)"
            value={q}
            onChangeText={setQ}
            style={{
              width: "100%",
              padding: 10,
              paddingLeft: 33,
              backgroundColor: "rgba(255,248,240,0.04)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.07)",
              borderRadius: 11,
              color: "#FFF8F0",
              fontSize: 13,
            }}
          />
          {q !== "" && (
            <TouchableOpacity
              onPress={() => setQ("")}
              style={{ position: "absolute", right: 11, top: 10, zIndex: 1 }}
            >
              <Text style={{ color: "rgba(255,248,240,0.4)", fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        {q === "" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 7, paddingBottom: 2 }}>
              {menuData.map((cat, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setAc(i)}
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 13,
                    borderRadius: 18,
                    backgroundColor: ac === i ? cat.color : "rgba(255,248,240,0.04)",
                  }}
                >
                  <Text
                    style={{
                      color: ac === i ? "#fff" : "rgba(255,248,240,0.45)",
                      fontWeight: ac === i ? "700" : "400",
                      fontSize: 12,
                    }}
                  >
                    {cat.icon} {cat.cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      <ScrollView style={{ paddingHorizontal: 18, paddingTop: 14 }} showsVerticalScrollIndicator={false}>
        {q !== "" && (
          <Text
            style={{
              fontSize: 12,
              color: "rgba(255,248,240,0.35)",
              marginBottom: 10,
            }}
          >
            {items.length} results for "{q}"
          </Text>
        )}
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onDetail(item)}
            style={{
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.04)",
              borderRadius: 18,
              marginBottom: 12,
              flexDirection: "row",
              overflow: "hidden",
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: item.img }}
                style={{ width: 108, height: 108 }}
                resizeMode="cover"
              />
              {item.spice >= 4 && (
                <View
                  style={{
                    position: "absolute",
                    top: 5,
                    left: 5,
                    backgroundColor: "rgba(192,57,43,0.9)",
                    borderRadius: 7,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}
                >
                  <Text style={{ fontSize: 9, fontWeight: "700", color: "#fff" }}>
                    🔥 HOT
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                padding: 11,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 4,
                    gap: 7,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#FFF8F0", flex: 1 }}>
                    {item.name}
                  </Text>
                  <Badge label={item.tag} />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    color: "rgba(255,248,240,0.38)",
                    lineHeight: 14,
                  }}
                >
                  {item.desc.slice(0, 55)}...
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <View>
                  <Text style={{ fontSize: 15, fontWeight: "900", color: "#FF6B35" }}>
                    Rs {item.price.toLocaleString()}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 7,
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <Text style={{ fontSize: 10, color: "#F0B429" }}>
                      ★ {item.rating}
                    </Text>
                    <Text style={{ fontSize: 10, color: "rgba(255,248,240,0.3)" }}>
                      ⏱ {item.time}
                    </Text>
                    {item.spice > 0 && <Chili n={item.spice} />}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(255,248,240,0.04)",
                    borderRadius: 11,
                  }}
                >
                  {cart[item.id] > 0 && (
                    <>
                      <TouchableOpacity
                        onPress={() => onRem(item)}
                        style={{
                          width: 34,
                          height: 34,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "#FF6B35", fontSize: 19 }}>−</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontWeight: "700",
                          minWidth: 18,
                          textAlign: "center",
                          fontSize: 13,
                          color: "#FFF8F0",
                        }}
                      >
                        {cart[item.id]}
                      </Text>
                    </>
                  )}
                  <TouchableOpacity
                    onPress={() => onAdd(item)}
                    style={{
                      backgroundColor: "#FF6B35",
                      borderRadius: 9,
                      width: 34,
                      height: 34,
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#FF6B35",
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.4,
                      shadowRadius: 10,
                      elevation: 3,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// ─── TABLES TAB ───────────────────────────────────────────────────────────────
const TablesTab = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(null);
  const [prog, setProg] = useState(0);
  const [filter, setFilter] = useState("all");
  const [reserveFor, setReserveFor] = useState(null);
  const [reserveDone, setReserveDone] = useState(false);
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveDate, setReserveDate] = useState("");
  const [reserveTime, setReserveTime] = useState("");
  const [reserveGuests, setReserveGuests] = useState("");

  const scan = () => {
    setScanning(true);
    setProg(0);
    setScanned(null);
    const iv = setInterval(() => {
      setProg((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return p + 2.5;
      });
    }, 50);
    setTimeout(() => {
      setScanning(false);
      setScanned(TABLES[Math.floor(Math.random() * TABLES.length)]);
    }, 2200);
  };

  const filtered =
    filter === "all" ? TABLES : TABLES.filter((t) => t.status === filter);

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0500" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#1E0A00",
            paddingHorizontal: 20,
            paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 35) : 70,
            paddingBottom: 18,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255,107,53,0.08)",
          }}
        >
          <Text
            style={{
              fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
              fontSize: 24,
              fontWeight: "700",
              color: "#FFF8F0",
              marginBottom: 4,
            }}
          >
            Table Scanner
          </Text>
          <Text style={{ fontSize: 13, color: "rgba(255,248,240,0.42)" }}>
            Scan any table's QR code to check availability
          </Text>
        </View>

        <View style={{ padding: 20 }}>
          {/* Scanner box */}
          <View
            style={{
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: scanning ? "#FF6B35" : "rgba(255,248,240,0.08)",
              borderRadius: 22,
              paddingVertical: 34,
              paddingHorizontal: 18,
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* QR frame */}
            <View
              style={{
                width: 150,
                height: 150,
                marginBottom: 18,
                position: "relative",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  inset: 0,
                  borderWidth: 1.5,
                  borderColor: "rgba(255,248,240,0.05)",
                  borderRadius: 12,
                }}
              />
              {[
                ["top", "left"],
                ["top", "right"],
                ["bottom", "left"],
                ["bottom", "right"],
              ].map(([v, h], i) => (
                <View
                  key={i}
                  style={{
                    position: "absolute",
                    [v]: 0,
                    [h]: 0,
                    width: 22,
                    height: 22,
                    borderTopWidth: v === "top" ? 2.5 : 0,
                    borderBottomWidth: v === "bottom" ? 2.5 : 0,
                    borderLeftWidth: h === "left" ? 2.5 : 0,
                    borderRightWidth: h === "right" ? 2.5 : 0,
                    borderColor: scanning ? "#FF6B35" : "rgba(255,107,53,0.42)",
                  }}
                />
              ))}
              <View
                style={{
                  position: "absolute",
                  inset: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 52 }}>{scanning ? "🔍" : "📱"}</Text>
              </View>
            </View>

            {scanning ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FF6B35",
                    fontWeight: "700",
                    marginBottom: 12,
                  }}
                >
                  Scanning table QR code...
                </Text>
                <View
                  style={{
                    height: 4,
                    backgroundColor: "rgba(255,248,240,0.05)",
                    borderRadius: 2,
                    overflow: "hidden",
                    width: 200,
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      backgroundColor: "#FF6B35",
                      width: `${prog}%`,
                    }}
                  />
                </View>
              </>
            ) : scanned ? (
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: `${STATUS_COLOR[scanned.status]}18`,
                    borderWidth: 2,
                    borderColor: STATUS_COLOR[scanned.status],
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>
                    {scanned.status === "free"
                      ? "✅"
                      : scanned.status === "reserved"
                        ? "🕒"
                        : "👥"}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "900",
                    color: STATUS_COLOR[scanned.status],
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                >
                  Table {scanned.id}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(255,248,240,0.65)",
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                >
                  {scanned.section} Section · {scanned.seats} Seats
                  {scanned.premium ? " · ⭐ Premium" : ""}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: STATUS_COLOR[scanned.status],
                    marginBottom: scanned.by ? 4 : 0,
                    textAlign: "center",
                  }}
                >
                  {scanned.status === "free"
                    ? "✓ Available — Ready to use"
                    : scanned.status === "reserved"
                      ? "🕒 Reserved"
                      : scanned.status === "occupied"
                        ? "👥 Currently Occupied"
                        : ""}
                </Text>
                {scanned.by && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(255,248,240,0.38)",
                      marginBottom: 12,
                      textAlign: "center",
                    }}
                  >
                    Reserved by {scanned.by} at {scanned.time}
                  </Text>
                )}
                {scanned.status === "free" && (
                  <TouchableOpacity
                    onPress={() => {
                      setReserveFor(scanned);
                      setReserveDone(false);
                    }}
                    style={{
                      marginTop: 12,
                      backgroundColor: "#27AE60",
                      borderRadius: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 22,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
                      Reserve This Table
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 13,
                  color: "rgba(255,248,240,0.38)",
                  marginBottom: 18,
                }}
              >
                Point your camera at the QR code on any table
              </Text>
            )}

            <TouchableOpacity
              onPress={scan}
              disabled={scanning}
              style={{
                marginTop: scanned || scanning ? 16 : 0,
                backgroundColor: scanning
                  ? "rgba(255,248,240,0.05)"
                  : "#FF6B35",
                borderRadius: 13,
                paddingVertical: 12,
                paddingHorizontal: 26,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>
                {scanning
                  ? "Scanning..."
                  : scanned
                    ? "Scan Again"
                    : "Start Scanning"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", gap: 8, paddingBottom: 12 }}>
            {["all", "free", "reserved", "occupied"].map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={{
                  paddingVertical: 7,
                  paddingHorizontal: 13,
                  borderRadius: 18,
                  backgroundColor:
                    filter === f
                      ? f === "free"
                        ? "#27AE60"
                        : f === "reserved"
                          ? "#F0B429"
                          : f === "occupied"
                            ? "#C0392B"
                            : "#FF6B35"
                      : "rgba(255,248,240,0.04)",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: filter === f ? "#fff" : "rgba(255,248,240,0.45)",
                    textTransform: "capitalize",
                  }}
                >
                  {f === "all" ? "All Tables" : f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Table grid */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 9,
            }}
          >
            {filtered.map((t) => (
              <TouchableOpacity
                key={t.id}
                onPress={() => setScanned(t)}
                style={{
                  width: (width - 58) / 3,
                  backgroundColor: "rgba(255,248,240,0.02)",
                  borderWidth: 1.5,
                  borderColor: `${STATUS_COLOR[t.status]}28`,
                  borderRadius: 15,
                  paddingVertical: 13,
                  paddingHorizontal: 8,
                  alignItems: "center",
                }}
              >
                {t.premium && (
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#F0B429",
                      marginBottom: 3,
                      letterSpacing: 1,
                    }}
                  >
                    PREMIUM
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginBottom: 3 }}>
                  {t.status === "free"
                    ? "🟢"
                    : t.status === "reserved"
                      ? "🟡"
                      : "🔴"}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "700", color: "#FFF8F0", marginBottom: 1 }}>
                  {t.id}
                </Text>
                <Text style={{ fontSize: 10, color: "rgba(255,248,240,0.38)" }}>
                  {t.seats} seats
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: STATUS_COLOR[t.status],
                    marginTop: 3,
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  {t.status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Legend */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 24,
            padding: 14,
            backgroundColor: "rgba(255,248,240,0.02)",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "rgba(255,248,240,0.05)",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {Object.entries(STATUS_COLOR).map(([s, c]) => (
            <View key={s} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 4.5,
                  backgroundColor: c,
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  color: "rgba(255,248,240,0.52)",
                  textTransform: "capitalize",
                }}
              >
                {s}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Reservation modal */}
      <Modal
        visible={reserveFor !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setReserveFor(null)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.88)", justifyContent: "center", padding: 22 }}
          activeOpacity={1}
          onPress={() => setReserveFor(null)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#190800",
              borderRadius: 22,
              padding: 26,
            }}
          >
            {reserveDone ? (
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <Text style={{ fontSize: 52, marginBottom: 12 }}>✅</Text>
                <Text
                  style={{
                    fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                    fontSize: 22,
                    fontWeight: "700",
                    color: "#FFF8F0",
                    marginBottom: 6,
                  }}
                >
                  Table Reserved!
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "rgba(255,248,240,0.5)",
                    marginBottom: 20,
                  }}
                >
                  Table {reserveFor?.id} · {reserveFor?.section} Section
                </Text>
                <PrimaryBtn onPress={() => setReserveFor(null)}>
                  Done
                </PrimaryBtn>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                    fontSize: 20,
                    fontWeight: "700",
                    color: "#FFF8F0",
                    marginBottom: 3,
                  }}
                >
                  Reserve Table {reserveFor?.id}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(255,248,240,0.42)",
                    marginBottom: 18,
                  }}
                >
                  {reserveFor?.section} Section · {reserveFor?.seats} Seats
                </Text>
                {[
                  ["Name", reserveName, setReserveName, "Your full name"],
                  ["Phone", reservePhone, setReservePhone, "+92 3XX XXXXXXX"],
                  ["Date", reserveDate, setReserveDate, "DD/MM/YYYY"],
                  ["Time", reserveTime, setReserveTime, "7:00 PM"],
                  ["Guests", reserveGuests, setReserveGuests, "Number of guests"],
                ].map(([l, v, s, p]) => (
                  <View key={l} style={{ marginBottom: 11 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(255,248,240,0.35)",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        marginBottom: 5,
                      }}
                    >
                      {l}
                    </Text>
                    <TextInput
                      placeholder={p}
                      placeholderTextColor="rgba(255,248,240,0.3)"
                      value={v}
                      onChangeText={s}
                      keyboardType={l === "Phone" ? "phone-pad" : l === "Guests" ? "numeric" : "default"}
                      style={{
                        width: "100%",
                        padding: 11,
                        backgroundColor: "rgba(255,248,240,0.03)",
                        borderWidth: 1,
                        borderColor: "rgba(255,248,240,0.07)",
                        borderRadius: 10,
                        color: "#FFF8F0",
                        fontSize: 13,
                      }}
                    />
                  </View>
                ))}
                <View style={{ flexDirection: "row", gap: 10, marginTop: 18 }}>
                  <OutlineBtn
                    onPress={() => setReserveFor(null)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </OutlineBtn>
                  <PrimaryBtn
                    onPress={() => {
                      if (reserveName && reservePhone) {
                        setReserveDone(true);
                      } else {
                        Alert.alert("Error", "Please fill in your name and phone number");
                      }
                    }}
                    style={{ flex: 2 }}
                  >
                    Confirm Reservation
                  </PrimaryBtn>
                </View>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ─── PAYMENT MODAL ────────────────────────────────────────────────────────────
const PaymentModal = ({ total, onSuccess, onClose }) => {
  const [method, setMethod] = useState(null);
  const [step, setStep] = useState(1); // 1=select 2=details 3=processing 4=done
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const METHODS = [
    {
      id: "easypaisa",
      label: "Easypaisa",
      logo: EASYPAISA,
      color: "#00A651",
      desc: "Mobile wallet",
    },
    {
      id: "jazzcash",
      label: "JazzCash",
      logo: JAZZCASH,
      color: "#E4002B",
      desc: "Mobile wallet",
    },
    {
      id: "card",
      label: "Debit/Credit Card",
      icon: "💳",
      color: "#2980B9",
      desc: "Visa · Mastercard · AMEX",
    },
    {
      id: "bank",
      label: "Bank Transfer",
      icon: "🏦",
      color: "#8E44AD",
      desc: "Online banking",
    },
    {
      id: "nayapay",
      label: "NayaPay",
      icon: "💚",
      color: "#00C48C",
      desc: "Digital wallet",
    },
    {
      id: "sadapay",
      label: "SadaPay",
      icon: "🔵",
      color: "#0052FF",
      desc: "Digital wallet",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: "💵",
      color: "#27AE60",
      desc: "Pay when delivered",
    },
  ];

  const isWallet = (m) =>
    ["easypaisa", "jazzcash", "nayapay", "sadapay"].includes(m?.id);
  const pay = () => {
    setStep(3);
    setTimeout(() => setStep(4), 2500);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.92)" }}>
        <View style={{ flex: 1, backgroundColor: "#130600", maxWidth: 430, width: "100%", alignSelf: "center" }}>
          {/* Header */}
          {step < 4 && (
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 14,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255,248,240,0.05)",
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={step === 1 ? onClose : () => setStep((s) => s - 1)}
                style={{
                  backgroundColor: "rgba(255,248,240,0.05)",
                  borderRadius: 10,
                  width: 36,
                  height: 36,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "rgba(255,248,240,0.65)", fontSize: 15 }}>
                  {step === 1 ? "✕" : "←"}
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                    fontSize: 20,
                    fontWeight: "700",
                    color: "#FFF8F0",
                  }}
                >
                  {step === 1
                    ? "Payment Method"
                    : step === 2
                      ? "Payment Details"
                      : "Processing"}
                </Text>
                <Text style={{ fontSize: 12, color: "#FF6B35", fontWeight: "700" }}>
                  Rs {total.toLocaleString()}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                {[1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 3.5,
                      backgroundColor: step >= i ? "#FF6B35" : "rgba(255,248,240,0.1)",
                    }}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Step 1 – Select */}
          {step === 1 && (
            <ScrollView style={{ flex: 1, paddingHorizontal: 18, paddingTop: 14 }} showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontSize: 11,
                  color: "rgba(255,248,240,0.33)",
                  marginBottom: 14,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Choose how to pay
              </Text>
              {METHODS.map((m) => (
                <TouchableOpacity
                  key={m.id}
                  onPress={() => setMethod(m)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 13,
                    padding: 15,
                    backgroundColor:
                      method?.id === m.id
                        ? "rgba(255,107,53,0.07)"
                        : "rgba(255,248,240,0.02)",
                    borderWidth: 1.5,
                    borderColor: method?.id === m.id
                      ? "rgba(255,107,53,0.5)"
                      : "rgba(255,248,240,0.05)",
                    borderRadius: 15,
                    marginBottom: 9,
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor: `${m.color}14`,
                      borderWidth: 1,
                      borderColor: `${m.color}28`,
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: m.logo ? 4 : 0,
                    }}
                  >
                    {m.logo ? (
                      <Image
                        source={{ uri: m.logo }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={{ fontSize: 22 }}>{m.icon}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "700", fontSize: 14, color: "#FFF8F0" }}>
                      {m.label}
                    </Text>
                    <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.38)" }}>
                      {m.desc}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: method?.id === m.id ? "#FF6B35" : "rgba(255,248,240,0.18)",
                      backgroundColor: method?.id === m.id ? "#FF6B35" : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {method?.id === m.id && (
                      <View
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 3.5,
                          backgroundColor: "#fff",
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Step 2 – Details */}
          {step === 2 && method && (
            <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 18 }} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 14,
                  backgroundColor: "rgba(255,248,240,0.03)",
                  borderRadius: 15,
                  marginBottom: 22,
                  borderWidth: 1,
                  borderColor: "rgba(255,248,240,0.06)",
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: `${method.color}18`,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    padding: method.logo ? 3 : 0,
                  }}
                >
                  {method.logo ? (
                    <Image
                      source={{ uri: method.logo }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={{ fontSize: 20 }}>{method.icon}</Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", color: "#FFF8F0" }}>{method.label}</Text>
                  <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.38)" }}>
                    Secure payment
                  </Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: "900", color: "#FF6B35" }}>
                  Rs {total.toLocaleString()}
                </Text>
              </View>

              {isWallet(method) && (
                <>
                  {[
                    ["Mobile Number", phone, setPhone, "+92 3XX XXXXXXX", "phone-pad"],
                    ["MPIN", pin, setPin, "••••", "numeric"],
                  ].map(([l, v, s, p, k]) => (
                    <View key={l} style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "rgba(255,248,240,0.36)",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          marginBottom: 7,
                        }}
                      >
                        {l}
                      </Text>
                      <TextInput
                        placeholder={p}
                        placeholderTextColor="rgba(255,248,240,0.3)"
                        value={v}
                        onChangeText={s}
                        keyboardType={k}
                        secureTextEntry={l === "MPIN"}
                        style={{
                          width: "100%",
                          padding: 13,
                          backgroundColor: "rgba(255,248,240,0.03)",
                          borderWidth: 1,
                          borderColor: "rgba(255,248,240,0.07)",
                          borderRadius: 11,
                          color: "#FFF8F0",
                          fontSize: l === "MPIN" ? 20 : 14,
                          letterSpacing: l === "MPIN" ? 6 : 0,
                        }}
                      />
                    </View>
                  ))}
                  <View
                    style={{
                      backgroundColor: "rgba(255,107,53,0.07)",
                      borderWidth: 1,
                      borderColor: "rgba(255,107,53,0.18)",
                      borderRadius: 11,
                      padding: 11,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.52)" }}>
                      📲 An OTP will be sent to confirm this payment
                    </Text>
                  </View>
                </>
              )}

              {method.id === "card" && (
                <>
                  {[
                    ["Card Number", cardNum, setCardNum, "1234 5678 9012 3456", "numeric"],
                    ["Cardholder Name", cardName, setCardName, "Hassan Ahmed", "default"],
                  ].map(([l, v, s, p, k]) => (
                    <View key={l} style={{ marginBottom: 14 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "rgba(255,248,240,0.36)",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          marginBottom: 7,
                        }}
                      >
                        {l}
                      </Text>
                      <TextInput
                        placeholder={p}
                        placeholderTextColor="rgba(255,248,240,0.3)"
                        value={v}
                        onChangeText={s}
                        keyboardType={k}
                        style={{
                          width: "100%",
                          padding: 13,
                          backgroundColor: "rgba(255,248,240,0.03)",
                          borderWidth: 1,
                          borderColor: "rgba(255,248,240,0.07)",
                          borderRadius: 11,
                          color: "#FFF8F0",
                          fontSize: 14,
                        }}
                      />
                    </View>
                  ))}
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    {[
                      ["Expiry", expiry, setExpiry, "MM/YY", "numeric"],
                      ["CVV", cvv, setCvv, "•••", "numeric"],
                    ].map(([l, v, s, p, k]) => (
                      <View key={l} style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "rgba(255,248,240,0.36)",
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            marginBottom: 7,
                          }}
                        >
                          {l}
                        </Text>
                        <TextInput
                          placeholder={p}
                          placeholderTextColor="rgba(255,248,240,0.3)"
                          value={v}
                          onChangeText={s}
                          keyboardType={k}
                          secureTextEntry={l === "CVV"}
                          style={{
                            width: "100%",
                            padding: 13,
                            backgroundColor: "rgba(255,248,240,0.03)",
                            borderWidth: 1,
                            borderColor: "rgba(255,248,240,0.07)",
                            borderRadius: 11,
                            color: "#FFF8F0",
                            fontSize: 14,
                          }}
                        />
                      </View>
                    ))}
                  </View>
                </>
              )}

              {method.id === "bank" && (
                <View
                  style={{
                    backgroundColor: "rgba(255,248,240,0.02)",
                    borderWidth: 1,
                    borderColor: "rgba(255,248,240,0.07)",
                    borderRadius: 16,
                    padding: 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "rgba(255,248,240,0.48)",
                      marginBottom: 14,
                    }}
                  >
                    Transfer to our account:
                  </Text>
                  {[
                    ["Bank", "Meezan Bank"],
                    ["Account Title", "Spice with Hassan"],
                    ["IBAN", "PK36MEZN0001060100498302"],
                    ["Amount", `Rs ${total.toLocaleString()}`],
                  ].map(([l, v]) => (
                    <View
                      key={l}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 9,
                        borderBottomWidth: 1,
                        borderBottomColor: "rgba(255,248,240,0.04)",
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.38)" }}>
                        {l}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "700",
                          color: l === "Amount" ? "#FF6B35" : "#FFF8F0",
                        }}
                      >
                        {v}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {method.id === "cod" && (
                <View style={{ alignItems: "center", paddingVertical: 36 }}>
                  <Text style={{ fontSize: 62, marginBottom: 14 }}>💵</Text>
                  <Text
                    style={{
                      fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                      fontSize: 22,
                      fontWeight: "700",
                      color: "#FFF8F0",
                      marginBottom: 8,
                    }}
                  >
                    Cash on Delivery
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "rgba(255,248,240,0.5)",
                      textAlign: "center",
                      lineHeight: 20,
                    }}
                  >
                    Pay Rs {total.toLocaleString()} cash when your order arrives.
                    Our rider will carry change.
                  </Text>
                </View>
              )}
            </ScrollView>
          )}

          {/* Step 3 – Processing */}
          {step === 3 && (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 40 }}>
              <ActivityIndicator size="large" color="#FF6B35" />
              <Text
                style={{
                  fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#FFF8F0",
                  marginTop: 22,
                  marginBottom: 8,
                }}
              >
                Processing Payment
              </Text>
              <Text style={{ fontSize: 13, color: "rgba(255,248,240,0.42)" }}>
                Please wait a moment...
              </Text>
            </View>
          )}

          {/* Step 4 – Success */}
          {step === 4 && (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 40 }}>
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: "#27AE60",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 22,
                }}
              >
                <Text style={{ fontSize: 46, color: "#fff" }}>✓</Text>
              </View>
              <Text
                style={{
                  fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                  fontSize: 28,
                  fontWeight: "700",
                  color: "#27AE60",
                  marginBottom: 6,
                }}
              >
                Payment Successful!
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: "#FF6B35",
                  marginBottom: 6,
                }}
              >
                Rs {total.toLocaleString()}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "rgba(255,248,240,0.42)",
                  marginBottom: 6,
                }}
              >
                via {method?.label}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(255,248,240,0.28)",
                  marginBottom: 30,
                }}
              >
                Order #{Math.floor(Math.random() * 9000 + 1000)} confirmed 🎉
              </Text>
              <PrimaryBtn onPress={onSuccess}>
                Track My Order →
              </PrimaryBtn>
            </View>
          )}

          {/* CTA */}
          {(step === 1 || step === 2) && (
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 14,
                paddingBottom: 26,
                backgroundColor: "#130600",
              }}
            >
              <PrimaryBtn
                onPress={step === 1 ? (method ? () => setStep(2) : null) : pay}
                disabled={step === 1 && !method}
              >
                {step === 1 ? "Continue →" : `Pay Rs ${total.toLocaleString()}`}
              </PrimaryBtn>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
const OrdersTab = ({ placed }) => {
  const [tab, setTab] = useState("active");
  const [expanded, setExpanded] = useState(null);

  const steps = [
    { label: "Order Confirmed", icon: "✅", done: true, time: "7:42 PM" },
    { label: "Kitchen Preparing", icon: "👨‍🍳", done: true, time: "7:48 PM" },
    {
      label: "Ready for Pickup",
      icon: "🍽️",
      done: placed,
      time: placed ? "8:10 PM" : "—",
    },
    { label: "Out for Delivery", icon: "🛵", done: false, time: "—" },
    { label: "Delivered", icon: "🎉", done: false, time: "—" },
  ];

  const history = [
    {
      id: "SWH4821",
      date: "12 Feb 2025",
      total: "Rs 2,450",
      items: ["Chicken Biryani", "Butter Chicken", "Garlic Naan ×2"],
    },
    {
      id: "SWH4756",
      date: "5 Feb 2025",
      total: "Rs 1,850",
      items: ["Seekh Kebab", "Dal Makhani", "Mango Lassi"],
    },
    {
      id: "SWH4612",
      date: "28 Jan 2025",
      total: "Rs 4,200",
      items: ["Mixed Grill Platter", "Lamb Karahi", "Gulab Jamun ×2"],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0500" }}>
      <View
        style={{
          backgroundColor: "#1E0A00",
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 35) : 70,
          paddingBottom: 18,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,107,53,0.08)",
        }}
      >
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 24,
            fontWeight: "700",
            color: "#FFF8F0",
            marginBottom: 16,
          }}
        >
          My Orders
        </Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(255,248,240,0.04)",
            borderRadius: 11,
            padding: 3,
          }}
        >
          {[
            ["active", "Active Order"],
            ["history", "History"],
          ].map(([t, l]) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={{
                flex: 1,
                paddingVertical: 9,
                borderRadius: 9,
                backgroundColor:
                  tab === t ? "#FF6B35" : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: tab === t ? "#fff" : "rgba(255,248,240,0.42)",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                {l}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {tab === "active" && (
        <ScrollView style={{ padding: 18 }} showsVerticalScrollIndicator={false}>
          {/* Active order */}
          <View
            style={{
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,107,53,0.18)",
              borderRadius: 18,
              padding: 18,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 11,
                    color: "rgba(255,248,240,0.32)",
                    marginBottom: 3,
                  }}
                >
                  Order #SWH5891
                </Text>
                <Text style={{ fontWeight: "700", fontSize: 14, color: "#FFF8F0" }}>
                  Butter Chicken, Naan ×2, Lassi
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(255,107,53,0.12)",
                  borderWidth: 1,
                  borderColor: "rgba(255,107,53,0.25)",
                  borderRadius: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 11,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 10, color: "#FF6B35", fontWeight: "700" }}>
                  ⏱ ETA
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "900", color: "#FF6B35" }}>
                  25 min
                </Text>
              </View>
            </View>

            {/* Steps */}
            <View style={{ paddingLeft: 26, position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  left: 8,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: "rgba(255,248,240,0.05)",
                }}
              />
              {steps.map((s, i) => (
                <View
                  key={i}
                  style={{
                    position: "relative",
                    marginBottom: i < steps.length - 1 ? 18 : 0,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      left: -26,
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: s.done ? "#FF6B35" : "rgba(255,248,240,0.05)",
                      borderWidth: 2,
                      borderColor: s.done ? "#FF6B35" : "rgba(255,248,240,0.08)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.done && <Text style={{ fontSize: 8, color: "#fff" }}>✓</Text>}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: s.done ? "700" : "400",
                        color: s.done ? "#FFF8F0" : "rgba(255,248,240,0.28)",
                      }}
                    >
                      {s.icon} {s.label}
                    </Text>
                    <Text style={{ fontSize: 11, color: "rgba(255,248,240,0.25)" }}>
                      {s.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Driver */}
          <View
            style={{
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.05)",
              borderRadius: 16,
              padding: 14,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "#FF6B35",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 22 }}>🛵</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: "rgba(255,248,240,0.32)", marginBottom: 2 }}>
                Your Rider
              </Text>
              <Text style={{ fontWeight: "700", color: "#FFF8F0" }}>Usman Ali</Text>
              <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.42)" }}>
                +92 301 4567890
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 7 }}>
              {[
                ["📞", "#27AE60"],
                ["💬", "#2980B9"],
              ].map(([ic, color]) => (
                <TouchableOpacity
                  key={ic}
                  onPress={() => Alert.alert("Contact Driver", `Calling ${ic === "📞" ? "Usman Ali" : "Sending message..."}`)}
                  style={{
                    backgroundColor: color + "12",
                    borderWidth: 1,
                    borderColor: color + "28",
                    borderRadius: 11,
                    width: 38,
                    height: 38,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 17 }}>{ic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Map placeholder */}
          <View
            style={{
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.05)",
              borderRadius: 16,
              height: 150,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1,
                  backgroundColor: "rgba(255,248,240,0.02)",
                  top: ((i + 1) * 100) / 6,
                }}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <View
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 1,
                  backgroundColor: "rgba(255,248,240,0.02)",
                  left: ((i + 1) * 100) / 8,
                }}
              />
            ))}
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 28, marginBottom: 4 }}>🛵</Text>
              <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.38)" }}>
                Live tracking in Expo app
              </Text>
            </View>
            <Text style={{ position: "absolute", left: "28%", top: "35%", fontSize: 18 }}>
              🌶️
            </Text>
            <Text style={{ position: "absolute", right: "22%", bottom: "25%", fontSize: 18 }}>
              📍
            </Text>
          </View>
        </ScrollView>
      )}

      {tab === "history" && (
        <ScrollView style={{ padding: 18 }} showsVerticalScrollIndicator={false}>
          {history.map((o) => (
            <TouchableOpacity
              key={o.id}
              onPress={() => setExpanded(expanded === o.id ? null : o.id)}
              style={{
                backgroundColor: "rgba(255,248,240,0.02)",
                borderWidth: 1,
                borderColor: "rgba(255,248,240,0.05)",
                borderRadius: 16,
                marginBottom: 11,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  padding: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 11,
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 11,
                    backgroundColor: "rgba(255,107,53,0.12)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 19 }}>🍛</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", fontSize: 14, color: "#FFF8F0", marginBottom: 2 }}>
                    #{o.id}
                  </Text>
                  <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.38)" }}>
                    {o.date}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 14, fontWeight: "900", color: "#FF6B35" }}>
                    {o.total}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#27AE60", fontWeight: "700" }}>
                    ✓ Delivered
                  </Text>
                </View>
              </View>
              {expanded === o.id && (
                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingBottom: 14,
                    borderTopWidth: 1,
                    borderTopColor: "rgba(255,248,240,0.04)",
                  }}
                >
                  {o.items.map((item) => (
                    <Text
                      key={item}
                      style={{
                        fontSize: 13,
                        color: "rgba(255,248,240,0.58)",
                        paddingVertical: 4,
                        borderBottomWidth: 1,
                        borderBottomColor: "rgba(255,248,240,0.04)",
                      }}
                    >
                      · {item}
                    </Text>
                  ))}
                  <View style={{ flexDirection: "row", gap: 9, marginTop: 12 }}>
                    <OutlineBtn onPress={() => Alert.alert("Reorder", "Your order has been placed!")} style={{ flex: 1, paddingVertical: 10 }}>
                      Reorder
                    </OutlineBtn>
                    <GhostBtn onPress={() => Alert.alert("Receipt", `Receipt for order #${o.id}`)} style={{ flex: 1, paddingVertical: 10 }}>
                      Receipt
                    </GhostBtn>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// ─── REVIEWS TAB ──────────────────────────────────────────────────────────────
const ReviewsTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [dish, setDish] = useState("");
  const [done, setDone] = useState(false);

  const avg = (
    REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length
  ).toFixed(1);

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0500" }}>
      <View
        style={{
          backgroundColor: "#1E0A00",
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 35) : 70,
          paddingBottom: 18,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,107,53,0.08)",
        }}
      >
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 24,
            fontWeight: "700",
            color: "#FFF8F0",
            marginBottom: 18,
          }}
        >
          Reviews & Ratings
        </Text>
        {/* Overview */}
        <View
          style={{
            flexDirection: "row",
            gap: 18,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                fontSize: 52,
                fontWeight: "900",
                color: "#FF6B35",
                lineHeight: 52,
              }}
            >
              {avg}
            </Text>
            <Stars n={Number(avg)} size={15} />
            <Text
              style={{
                fontSize: 11,
                color: "rgba(255,248,240,0.33)",
                marginTop: 4,
              }}
            >
              {REVIEWS.length} reviews
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {[5, 4, 3, 2, 1].map((n) => {
              const cnt = REVIEWS.filter((r) => r.rating === n).length;
              return (
                <View
                  key={n}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: "rgba(255,248,240,0.42)",
                      width: 11,
                      textAlign: "right",
                    }}
                  >
                    {n}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#F0B429" }}>★</Text>
                  <View
                    style={{
                      flex: 1,
                      height: 6,
                      backgroundColor: "rgba(255,248,240,0.05)",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        backgroundColor: "#FF6B35",
                        width: `${Math.round((cnt / REVIEWS.length) * 100)}%`,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "rgba(255,248,240,0.32)",
                      width: 14,
                    }}
                  >
                    {cnt}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <PrimaryBtn onPress={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "✏️ Write a Review"}
        </PrimaryBtn>
      </View>

      {/* Write form */}
      {showForm && (
        <View
          style={{
            padding: 18,
            backgroundColor: "rgba(255,248,240,0.01)",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255,248,240,0.05)",
          }}
        >
          {done ? (
            <View style={{ alignItems: "center", paddingVertical: 16 }}>
              <Text style={{ fontSize: 46, marginBottom: 10 }}>🎉</Text>
              <Text
                style={{
                  fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#FFF8F0",
                  marginBottom: 3,
                }}
              >
                Thank You!
              </Text>
              <Text style={{ fontSize: 13, color: "rgba(255,248,240,0.42)" }}>
                Review submitted successfully
              </Text>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(255,248,240,0.36)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 9,
                  }}
                >
                  Your Rating
                </Text>
                <View style={{ flexDirection: "row", gap: 7 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => setStars(i)}
                      onPressIn={() => setHover(i)}
                      onPressOut={() => setHover(0)}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          transform: [{ scale: i <= (hover || stars) ? 1.2 : 1 }],
                          opacity: i <= (hover || stars) ? 1 : 0.22,
                          color: "#F0B429",
                        }}
                      >
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(255,248,240,0.36)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 7,
                  }}
                >
                  Dish Ordered
                </Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    placeholder="Select a dish..."
                    placeholderTextColor="rgba(255,248,240,0.3)"
                    value={dish}
                    onChangeText={setDish}
                    style={{
                      width: "100%",
                      padding: 11,
                      backgroundColor: "rgba(255,248,240,0.03)",
                      borderWidth: 1,
                      borderColor: "rgba(255,248,240,0.07)",
                      borderRadius: 10,
                      color: dish ? "#FFF8F0" : "rgba(255,248,240,0.3)",
                      fontSize: 13,
                    }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(255,248,240,0.36)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 7,
                  }}
                >
                  Your Review
                </Text>
                <TextInput
                  placeholder="Tell us about your experience..."
                  placeholderTextColor="rgba(255,248,240,0.3)"
                  value={text}
                  onChangeText={setText}
                  multiline
                  numberOfLines={4}
                  style={{
                    width: "100%",
                    padding: 11,
                    backgroundColor: "rgba(255,248,240,0.03)",
                    borderWidth: 1,
                    borderColor: "rgba(255,248,240,0.07)",
                    borderRadius: 10,
                    color: "#FFF8F0",
                    fontSize: 13,
                    minHeight: 90,
                    textAlignVertical: "top",
                  }}
                />
              </View>
              <PrimaryBtn
                onPress={() => {
                  if (stars && text) {
                    setDone(true);
                    setTimeout(() => {
                      setShowForm(false);
                      setDone(false);
                      setStars(0);
                      setText("");
                      setDish("");
                    }, 2000);
                  } else {
                    Alert.alert("Error", "Please provide both rating and review text");
                  }
                }}
                disabled={!stars || !text}
              >
                Submit Review
              </PrimaryBtn>
            </>
          )}
        </View>
      )}

      {/* Reviews list */}
      <ScrollView style={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        {REVIEWS.map((r) => (
          <View
            key={r.id}
            style={{
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.04)",
              borderRadius: 16,
              padding: 16,
              marginBottom: 11,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 11,
                marginBottom: 11,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,107,53,0.12)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>{r.av}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "700", fontSize: 14, color: "#FFF8F0" }}>
                    {r.name}
                  </Text>
                  <Text style={{ fontSize: 11, color: "rgba(255,248,240,0.28)" }}>
                    {r.date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Stars n={r.rating} size={12} />
                  <Text style={{ fontSize: 11, color: "rgba(255,248,240,0.33)" }}>
                    · {r.dish}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: "rgba(255,248,240,0.6)",
                lineHeight: 18,
              }}
            >
              {r.text}
            </Text>
            <View style={{ flexDirection: "row", gap: 14, marginTop: 11 }}>
              <TouchableOpacity onPress={() => Alert.alert("Thanks", "You found this review helpful")}>
                <Text style={{ color: "rgba(255,248,240,0.32)", fontSize: 12 }}>
                  👍 Helpful
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("Reply", "Reply feature coming soon")}>
                <Text style={{ color: "rgba(255,248,240,0.32)", fontSize: 12 }}>
                  💬 Reply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// ─── PROFILE TAB ──────────────────────────────────────────────────────────────
const ProfileTab = () => {
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(true);
  const [promo, setPromo] = useState(true);

  const Toggle = ({ v, s }) => (
    <TouchableOpacity
      onPress={() => s(!v)}
      style={{
        width: 42,
        height: 23,
        borderRadius: 11.5,
        backgroundColor: v ? "#FF6B35" : "rgba(255,248,240,0.09)",
        justifyContent: "center",
        paddingHorizontal: 2,
      }}
    >
      <View
        style={{
          width: 17,
          height: 17,
          borderRadius: 8.5,
          backgroundColor: "#fff",
          alignSelf: v ? "flex-end" : "flex-start",
        }}
      />
    </TouchableOpacity>
  );

  const menuItems = [
    { icon: "📋", l: "My Orders", d: "View order history" },
    { icon: "❤️", l: "Favourites", d: "Saved dishes" },
    { icon: "📍", l: "Addresses", d: "Delivery addresses" },
    { icon: "💳", l: "Payment Methods", d: "Saved cards & wallets" },
    { icon: "🎁", l: "Rewards", d: "1,240 loyalty points" },
    { icon: "🎟️", l: "Vouchers", d: "2 active coupons" },
    { icon: "🤝", l: "Refer a Friend", d: "Earn 500 points" },
    { icon: "❓", l: "Help & Support", d: "FAQs · Contact us" },
    { icon: "⚙️", l: "Settings", d: "App preferences" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0D0500" }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#2C1000",
          paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 40) : 80,
          paddingHorizontal: 20,
          paddingBottom: 22,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 78,
            height: 78,
            borderRadius: 39,
            backgroundColor: "#FF6B35",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
            shadowColor: "#FF6B35",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 24,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 34 }}>👨</Text>
        </View>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 22,
            fontWeight: "700",
            color: "#FFF8F0",
            marginBottom: 3,
          }}
        >
          Syed Hassan Dildar
        </Text>
        <Text style={{ fontSize: 13, color: "rgba(255,248,240,0.42)", marginBottom: 3 }}>
          hassan@email.com
        </Text>
        <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.28)" }}>
          +92 300 1122330
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            backgroundColor: "rgba(240,180,41,0.12)",
            borderWidth: 1,
            borderColor: "rgba(240,180,41,0.28)",
            borderRadius: 18,
            paddingVertical: 7,
            paddingHorizontal: 14,
            marginTop: 14,
          }}
        >
          <Text style={{ fontSize: 14 }}>👑</Text>
          <View>
            <Text style={{ fontSize: 11, color: "#F0B429", fontWeight: "700" }}>
              GOLD MEMBER
            </Text>
            <Text style={{ fontSize: 10, color: "rgba(255,248,240,0.42)" }}>
              1,240 points
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 18 }}>
          {[
            ["14", "Orders"],
            ["4.8★", "Rating"],
            ["Rs 24k", "Spent"],
          ].map(([v, l]) => (
            <View
              key={l}
              style={{
                flex: 1,
                backgroundColor: "rgba(255,248,240,0.03)",
                borderRadius: 12,
                paddingVertical: 10,
                paddingHorizontal: 6,
                borderWidth: 1,
                borderColor: "rgba(255,107,53,0.09)",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "900", color: "#FF6B35" }}>
                {v}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "rgba(255,248,240,0.32)",
                  marginTop: 2,
                }}
              >
                {l}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Preferences */}
      <View style={{ paddingHorizontal: 20, paddingTop: 18 }}>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 18,
            fontWeight: "700",
            color: "#FFF8F0",
            marginBottom: 11,
          }}
        >
          Preferences
        </Text>
        {[
          ["🔔", "Push Notifications", notif, setNotif],
          ["🌙", "Dark Mode", dark, setDark],
          ["📧", "Promo Emails", promo, setPromo],
        ].map(([ic, l, v, s]) => (
          <View
            key={l}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 11,
              padding: 13,
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.04)",
              borderRadius: 13,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 17 }}>{ic}</Text>
            <Text style={{ flex: 1, fontSize: 14, fontWeight: "500", color: "#FFF8F0" }}>
              {l}
            </Text>
            <Toggle v={v} s={s} />
          </View>
        ))}
      </View>

      {/* Account menu */}
      <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
            fontSize: 18,
            fontWeight: "700",
            color: "#FFF8F0",
            marginBottom: 11,
          }}
        >
          Account
        </Text>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.l}
            onPress={() => Alert.alert(item.l, item.d)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: 13,
              backgroundColor: "rgba(255,248,240,0.02)",
              borderWidth: 1,
              borderColor: "rgba(255,248,240,0.04)",
              borderRadius: 13,
              marginBottom: 7,
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                backgroundColor: "rgba(255,107,53,0.07)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 17 }}>{item.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#FFF8F0" }}>
                {item.l}
              </Text>
              <Text style={{ fontSize: 11, color: "rgba(255,248,240,0.36)" }}>
                {item.d}
              </Text>
            </View>
            <Text style={{ color: "rgba(255,248,240,0.18)", fontSize: 16 }}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 }}>
        <TouchableOpacity
          onPress={() => Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: () => console.log("Logged out") }
          ])}
          style={{
            width: "100%",
            padding: 13,
            backgroundColor: "rgba(192,57,43,0.08)",
            borderWidth: 1,
            borderColor: "rgba(192,57,43,0.25)",
            borderRadius: 13,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#C0392B", fontWeight: "700", fontSize: 14 }}>
            🚪 Sign Out
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            marginTop: 14,
            fontSize: 10,
            color: "rgba(255,248,240,0.16)",
          }}
        >
          Spice with Hassan v1.0.0 · Made with ❤️ in Pakistan
        </Text>
      </View>
    </ScrollView>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const App = () => {
  const SERVER_URL = "http://localhost:5000"; // Update with local IP for physical devices
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("home");
  const [cart, setCart] = useState({});
  const [menuContent, setMenuContent] = useState([]); // Dynamic menu state
  const [detail, setDetail] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/catalog`);
        if (!res.ok) throw new Error("Server not reachable");
        const data = await res.json();
        const formatted = [
          {
            cat: "Daily Specials",
            icon: "🌟",
            color: "#FF6B35",
            items: data.daily_specials.map(item => ({
              ...item,
              img: item.image_url
            }))
          }
        ];
        setMenuContent(formatted);
      } catch (err) {
        console.error("Backend fetch failed, using internal fallback:", err);
        setMenuContent(MENU); // Use local MENU as fallback
      }
    };
    fetchMenu();
  }, []);

  const allItems = (menuContent.length > 0 ? menuContent : MENU).flatMap((c) => c.items);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = allItems.reduce(
    (s, i) => s + (cart[i.id] || 0) * i.price,
    0,
  );
  const cartItems = allItems.filter((i) => cart[i.id]);

  const addItem = (item) =>
    setCart((p) => ({ ...p, [item.id]: (p[item.id] || 0) + 1 }));
  const remItem = (item) =>
    setCart((p) => {
      const n = { ...p };
      if (n[item.id] > 1) n[item.id]--;
      else delete n[item.id];
      return n;
    });
  const clearCart = () => setCart({});

  if (screen === "splash")
    return <SplashScreen onDone={() => setScreen("login")} />;
  if (screen === "login")
    return <LoginScreen onLogin={() => setScreen("app")} />;

  const TABS = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "menu", icon: "🍛", label: "Menu" },
    { id: "tables", icon: "📱", label: "Tables" },
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "reviews", icon: "⭐", label: "Reviews" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D0500" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0500" />
      
      {/* Page content */}
      <View style={{ flex: 1, paddingBottom: 78 }}>
        {tab === "home" && (
          <HomeTab
            menuData={menuContent.length > 0 ? menuContent : MENU}
            onMenu={() => setTab("menu")}
            onTable={() => setTab("tables")}
            cartCount={cartCount}
            onCart={() => setShowCart(true)}
          />
        )}
        {tab === "menu" && (
          <MenuTab
            menuData={menuContent} // Pass the fetched menu
            cart={cart}
            onAdd={addItem}
            onRem={remItem}
            onDetail={setDetail}
            cartCount={cartCount}
            onCart={() => setShowCart(true)}
          />
        )}
        {tab === "tables" && <TablesTab />}
        {tab === "orders" && <OrdersTab placed={orderPlaced} />}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "profile" && <ProfileTab />}
      </View>

      {/* Bottom nav */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(9,3,0,0.97)",
          borderTopWidth: 1,
          borderTopColor: "rgba(255,107,53,0.1)",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 8,
          paddingBottom: Platform.OS === "ios" ? 14 : 8,
        }}
      >
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.id}
            onPress={() => setTab(t.id)}
            style={{
              alignItems: "center",
              paddingHorizontal: 6,
              paddingVertical: 4,
              position: "relative",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                opacity: tab === t.id ? 1 : 0.42,
              }}
            >
              {t.icon}
            </Text>
            <Text
              style={{
                fontSize: 9,
                color: tab === t.id ? "#FF6B35" : "rgba(255,248,240,0.3)",
                fontWeight: tab === t.id ? "700" : "400",
                letterSpacing: 0.3,
              }}
            >
              {t.label}
            </Text>
            {tab === t.id && (
              <View
                style={{
                  position: "absolute",
                  bottom: -8,
                  width: 18,
                  height: 2,
                  backgroundColor: "#FF6B35",
                  borderRadius: 1,
                }}
              />
            )}
            {t.id === "menu" && cartCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -1,
                  backgroundColor: "#FF6B35",
                  borderRadius: 7,
                  width: 14,
                  height: 14,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 8, fontWeight: "900", color: "#fff" }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Floating cart */}
      {cartCount > 0 && (tab === "menu" || tab === "home") && (
        <View style={{ position: "absolute", bottom: 86, right: 14, zIndex: 49 }}>
          <TouchableOpacity
            onPress={() => setShowCart(true)}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#FF6B35",
              borderRadius: 18,
              paddingVertical: 11,
              paddingHorizontal: 18,
              shadowColor: "#FF6B35",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.55,
              shadowRadius: 24,
              elevation: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
              🛒 {cartCount} · Rs {cartTotal.toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Item detail modal */}
      <Modal
        visible={detail !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDetail(null)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.85)" }}
          activeOpacity={1}
          onPress={() => setDetail(null)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#1A0800",
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              maxHeight: "91%",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {detail && (
                <>
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{ uri: detail.img }}
                      style={{ width: "100%", height: 210 }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => setDetail(null)}
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: "rgba(13,5,0,0.75)",
                        borderRadius: 10,
                        width: 34,
                        height: 34,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "#FFF8F0", fontSize: 16 }}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ padding: 18 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                          fontSize: 24,
                          fontWeight: "700",
                          color: "#FFF8F0",
                          flex: 1,
                          marginRight: 12,
                        }}
                      >
                        {detail.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "900",
                          color: "#FF6B35",
                        }}
                      >
                        Rs {detail.price.toLocaleString()}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 12,
                        alignItems: "center",
                        marginBottom: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <Stars n={detail.rating} size={14} />
                      <Text style={{ fontSize: 12, color: "#F0B429", fontWeight: "700" }}>
                        {detail.rating}
                      </Text>
                      {detail.spice > 0 && <Chili n={detail.spice} />}
                      <Badge label={detail.tag} />
                    </View>
                    <View style={{ flexDirection: "row", gap: 18, marginBottom: 14 }}>
                      <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.42)" }}>
                        ⏱ {detail.time}
                      </Text>
                      <Text style={{ fontSize: 12, color: "rgba(255,248,240,0.42)" }}>
                        🔥 {detail.cal} kcal
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "rgba(255,248,240,0.62)",
                        lineHeight: 20,
                        marginBottom: 22,
                      }}
                    >
                      {detail.desc}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "rgba(255,248,240,0.05)",
                          borderRadius: 12,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => remItem(detail)}
                          style={{
                            width: 42,
                            height: 42,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "#FF6B35", fontSize: 22 }}>−</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "700", minWidth: 26, textAlign: "center", color: "#FFF8F0" }}>
                          {cart[detail.id] || 0}
                        </Text>
                        <TouchableOpacity
                          onPress={() => addItem(detail)}
                          style={{
                            width: 42,
                            height: 42,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "#FF6B35", fontSize: 22 }}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <PrimaryBtn
                        onPress={() => {
                          addItem(detail);
                          setDetail(null);
                        }}
                        style={{ flex: 1 }}
                      >
                        Add to Cart
                      </PrimaryBtn>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Cart modal */}
      <Modal
        visible={showCart}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCart(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.85)" }}
          activeOpacity={1}
          onPress={() => setShowCart(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#1A0800",
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              maxHeight: "91%",
            }}
          >
            <View style={{ padding: 22 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <Text
                  style={{
                    fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                    fontSize: 22,
                    fontWeight: "700",
                    color: "#FFF8F0",
                  }}
                >
                  🛒 Your Order
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCart(false)}
                  style={{
                    backgroundColor: "rgba(255,248,240,0.05)",
                    borderRadius: 9,
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "rgba(255,248,240,0.6)", fontSize: 14 }}>✕</Text>
                </TouchableOpacity>
              </View>
              {cartItems.length === 0 ? (
                <View style={{ alignItems: "center", paddingVertical: 38 }}>
                  <Text style={{ fontSize: 46, marginBottom: 10 }}>🍽️</Text>
                  <Text
                    style={{
                      fontFamily: Platform.OS === "ios" ? "Cormorant Garamond" : "serif",
                      fontSize: 20,
                      color: "rgba(255,248,240,0.28)",
                    }}
                  >
                    Cart is empty
                  </Text>
                  <Text style={{ fontSize: 13, color: "rgba(255,248,240,0.28)", marginTop: 6 }}>
                    Add some delicious items!
                  </Text>
                </View>
              ) : (
                <>
                  <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                    {cartItems.map((item) => (
                      <View
                        key={item.id}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 12,
                          padding: 13,
                          backgroundColor: "rgba(255,248,240,0.03)",
                          borderRadius: 15,
                          borderWidth: 1,
                          borderColor: "rgba(255,248,240,0.05)",
                        }}
                      >
                        <Image
                          source={{ uri: item.img }}
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 11,
                          }}
                          resizeMode="cover"
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontWeight: "600", fontSize: 13, color: "#FFF8F0" }}>
                            {item.name}
                          </Text>
                          <Text style={{ fontSize: 13, color: "#FF6B35", fontWeight: "700" }}>
                            Rs {(item.price * cart[item.id]).toLocaleString()}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "rgba(255,248,240,0.04)",
                            borderRadius: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => remItem(item)}
                            style={{
                              width: 30,
                              height: 30,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ color: "#FF6B35", fontSize: 18 }}>−</Text>
                          </TouchableOpacity>
                          <Text style={{ fontWeight: "700", minWidth: 22, textAlign: "center", color: "#FFF8F0" }}>
                            {cart[item.id]}
                          </Text>
                          <TouchableOpacity
                            onPress={() => addItem(item)}
                            style={{
                              width: 30,
                              height: 30,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ color: "#FF6B35", fontSize: 18 }}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: "rgba(255,248,240,0.07)",
                      paddingTop: 14,
                      marginTop: 6,
                    }}
                  >
                    {[
                      ["Subtotal", `Rs ${cartTotal.toLocaleString()}`],
                      [
                        "Service (5%)",
                        `Rs ${Math.round(cartTotal * 0.05).toLocaleString()}`,
                      ],
                    ].map(([l, v]) => (
                      <View
                        key={l}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ color: "rgba(255,248,240,0.45)", fontSize: 13 }}>
                          {l}
                        </Text>
                        <Text style={{ fontSize: 13, fontWeight: "600", color: "#FFF8F0" }}>
                          {v}
                        </Text>
                      </View>
                    ))}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 18,
                      }}
                    >
                      <Text style={{ fontWeight: "700", fontSize: 15, color: "#FFF8F0" }}>
                        Total
                      </Text>
                      <Text
                        style={{
                          fontWeight: "900",
                          fontSize: 19,
                          color: "#FF6B35",
                        }}
                      >
                        Rs {Math.round(cartTotal * 1.05).toLocaleString()}
                      </Text>
                    </View>
                    <PrimaryBtn
                      onPress={() => {
                        setShowCart(false);
                        setShowPay(true);
                      }}
                    >
                      Proceed to Payment →
                    </PrimaryBtn>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Payment modal */}
      {showPay && ( 
        <PaymentModal
          total={Math.round(cartTotal * 1.05)}
          onSuccess={async () => {
            // Q3: The Order Logger logic
            try {
              const orderData = {
                user: "Syed Hassan Dildar",
                total: Math.round(cartTotal * 1.05),
                items: cartItems.map(i => ({
                  name: i.name,
                  quantity: cart[i.id],
                  price: i.price
                }))
              };
              
              await fetch(`${SERVER_URL}/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
              });
              
              console.log("Order logged to server successfully!");
            } catch (err) {
              console.error("Order logging failed:", err);
            }

            setShowPay(false);
            clearCart();
            setOrderPlaced(true);
            setTab("orders");
          }}
          onClose={() => setShowPay(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
   
    