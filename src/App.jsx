import { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    category: "எண்ணம் (Thoughts)",
    question: "காலையில் எழுந்திருக்கும்போது உங்கள் முதல் எண்ணம் என்ன?",
    options: [
      { text: "இன்று என்ன நடக்குமோ என்று பயமாக இருக்கு", score: 1 },
      { text: "சாதாரணமா இருக்கு, பெரிதா நினைக்கல", score: 2 },
      { text: "இன்று ஏதாவது நல்லது நடக்கும் என்று நம்பிக்கையாக இருக்கு", score: 3 },
      { text: "இன்று என் கனவை நோக்கி ஒரு அடி முன்னேறுவேன் என்று உற்சாகமாக இருக்கு", score: 4 },
    ],
  },
  {
    id: 2,
    category: "தோல்வி (Failure)",
    question: "ஒரு தோல்வி வந்தால் நீங்கள் என்ன செய்வீர்கள்?",
    options: [
      { text: "என்னால் முடியாது என்று விட்டுவிடுவேன்", score: 1 },
      { text: "சோர்வாக இருக்கும், ஆனா நாளைக்கு பார்க்கலாம்", score: 2 },
      { text: "என்ன தவறு நடந்தது என்று யோசிப்பேன்", score: 3 },
      { text: "இது என் வளர்ச்சிக்கான பாடம் என்று உடனே திரும்புவேன்", score: 4 },
    ],
  },
  {
    id: 3,
    category: "கனவு (Dream)",
    question: "உங்கள் கனவைப் பற்றி யோசிக்கும்போது எப்படி உணர்கிறீர்கள்?",
    options: [
      { text: "என்னால் சாத்தியமில்லை என்று தோன்றுகிறது", score: 1 },
      { text: "சாத்தியம்தான், ஆனா எப்போது நடக்கும் தெரியல", score: 2 },
      { text: "நான் முயற்சி செய்தால் நடக்கும் என்று நம்புகிறேன்", score: 3 },
      { text: "அது நடந்துவிட்டது போல் உணர்கிறேன், வழி தெரிகிறது", score: 4 },
    ],
  },
  {
    id: 4,
    category: "செயல் (Action)",
    question: "உங்கள் இலக்கை நோக்கி தினமும் என்ன செய்கிறீர்கள்?",
    options: [
      { text: "ஒன்றும் செய்வதில்லை, தயாரில்லை என்று தோன்றுகிறது", score: 1 },
      { text: "சில நாட்கள் செய்கிறேன், சில நாட்கள் மறந்துவிடுகிறேன்", score: 2 },
      { text: "வாரம் 3-4 நாட்கள் செய்கிறேன்", score: 3 },
      { text: "தினமும் ஒரு சின்ன அடியாவது எடுத்து வைக்கிறேன்", score: 4 },
    ],
  },
  {
    id: 5,
    category: "நன்றி (Gratitude)",
    question: "இன்று உங்கள் வாழ்க்கையில் நன்றி சொல்ல என்ன இருக்கிறது என்று கேட்டால்?",
    options: [
      { text: "எனக்கு எதுவும் நல்லதாக இல்லை", score: 1 },
      { text: "சில நேரம் நன்றி உணர்கிறேன், சில நேரம் இல்லை", score: 2 },
      { text: "உடல்நலம், குடும்பம் என்று சொல்லலாம்", score: 3 },
      { text: "உடனே 5-10 விஷயங்கள் நினைவுக்கு வருகின்றன", score: 4 },
    ],
  },
  {
    id: 6,
    category: "நம்பிக்கை (Belief)",
    question: "நீங்கள் நினைத்ததை அடைய தகுதியுள்ளவரா என்று கேட்டால்?",
    options: [
      { text: "இல்லை, நான் சாதாரண மனிதன்/மனிதி", score: 1 },
      { text: "தெரியல, ஒருவேளை முடியும்", score: 2 },
      { text: "ஆமா, நான் முயற்சி செய்தால் நிச்சயம் முடியும்", score: 3 },
      { text: "நான் பிறந்தே அதற்கு தகுதியானவன்/தகுதியானவள்", score: 4 },
    ],
  },
  {
    id: 7,
    category: "சுற்றுப்புறம் (Environment)",
    question: "உங்கள் நண்பர்கள் / குடும்பம் உங்கள் கனவை பற்றி என்ன சொல்கிறார்கள்?",
    options: [
      { text: "எல்லாரும் சாத்தியமில்லை என்று சொல்கிறார்கள், நம்பிவிடுகிறேன்", score: 1 },
      { text: "அவர்கள் கருத்து என்னை சில நேரம் தடுக்கிறது", score: 2 },
      { text: "அவர்கள் கருத்தை கேட்கிறேன் ஆனா என் முடிவு என்னுடையதே", score: 3 },
      { text: "என் நம்பிக்கை என் சக்தி, யாரும் மாற்ற முடியாது", score: 4 },
    ],
  },
  {
    id: 8,
    category: "அடையாளம் (Identity)",
    question: "நீங்கள் யாரென்று உங்களுக்கு தெரியுமா?",
    options: [
      { text: "என்னால் என்னை புரிந்துகொள்ள முடியவில்லை", score: 1 },
      { text: "சில நேரம் தெளிவாக இருக்கும், சில நேரம் குழப்பமாக இருக்கும்", score: 2 },
      { text: "என் மதிப்புகளும் இலக்கும் எனக்கு தெரியும்", score: 3 },
      { text: "நான் என்னை முழுமையாக ஏற்று, என் தனித்தன்மையோடு வாழுகிறேன்", score: 4 },
    ],
  },
];

const getResult = (score) => {
  const pct = (score / 32) * 100;
  if (pct <= 35) return {
    level: "விதை நிலை", emoji: "🌱", subtitle: "Seed Stage", color: "#e85d5d",
    desc: "உங்கள் மனம் இன்னும் விழிப்படையவில்லை. பயம் மற்றும் சந்தேகம் உங்களை தடுக்கிறது.",
    action: "90 நாள் transformation program உங்களுக்காகவே உருவாக்கப்பட்டது. இன்றே தொடங்குங்கள்.",
  };
  if (pct <= 55) return {
    level: "கிளை நிலை", emoji: "🌿", subtitle: "Sprout Stage", color: "#f5a623",
    desc: "நீங்கள் விழிக்கத் தொடங்கியுள்ளீர்கள். நம்பிக்கையும் சந்தேகமும் சேர்ந்து போகிறது.",
    action: "உங்கள் மனசை next level க்கு எடுத்துச் செல்ல coaching எடுங்கள்!",
  };
  if (pct <= 75) return {
    level: "மலர் நிலை", emoji: "🌸", subtitle: "Blossom Stage", color: "#7b61ff",
    desc: "மிகவும் நல்லது! உங்கள் mindset வலுவாக இருக்கிறது.",
    action: "Advanced manifestation techniques உங்களுக்கு அடுத்த quantum leap தரும்.",
  };
  return {
    level: "பூரண நிலை", emoji: "🌟", subtitle: "Full Bloom Stage", color: "#00c896",
    desc: "நீங்கள் ஒரு powerful manifestor! உங்கள் மனம் abundance இல் இயங்குகிறது.",
    action: "உங்கள் transformation journey ஐ share பண்ணுங்கள். நீங்கள் ஒரு inspiration!",
  };
};

export default function MindsetApp() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);
  const pct = Math.round((totalScore / 32) * 100);

  const handleStart = () => {
    if (!nameInput.trim()) return;
    setName(nameInput.trim());
    setScreen("quiz");
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= questions.length) setScreen("result");
    else setCurrent(current + 1);
  };

  const handleRestart = () => {
    setScreen("intro"); setCurrent(0); setAnswers([]);
    setSelected(null); setName(""); setNameInput("");
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a1a,#12102b,#0d1a2e)", fontFamily:"'Noto Sans Tamil','Segoe UI',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div style={{ width:"100%", maxWidth:"560px" }}>

        {screen === "intro" && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"12px", letterSpacing:"4px", color:"#7b61ff", marginBottom:"16px" }}>manifest.with.you</div>
            <div style={{ fontSize:"52px", marginBottom:"8px" }}>🧠✨</div>
            <h1 style={{ fontSize:"clamp(24px,5vw,34px)", fontWeight:800, background:"linear-gradient(135deg,#fff,#b8a9ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"8px" }}>
              உங்கள் மனசு எந்த நிலையில் இருக்கிறது?
            </h1>
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"14px", marginBottom:"28px", lineHeight:1.7 }}>
              8 கேள்விகள் மூலம் உங்கள் mindset level கண்டறியுங்கள்.<br/>
              <span style={{ color:"#7b61ff" }}>One Decision. 90 Days. New Life!</span>
            </p>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"24px", marginBottom:"20px" }}>
              <label style={{ display:"block", color:"rgba(255,255,255,0.7)", fontSize:"14px", marginBottom:"10px", textAlign:"left" }}>உங்கள் பெயர் என்ன?</label>
              <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleStart()} placeholder="உங்கள் பெயரை எழுதுங்கள்..."
                style={{ width:"100%", padding:"14px 16px", borderRadius:"12px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", fontSize:"16px", outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
            </div>
            <button onClick={handleStart} style={{ width:"100%", padding:"15px", borderRadius:"14px", background:nameInput.trim()?"linear-gradient(135deg,#7b61ff,#5a3fe8)":"rgba(255,255,255,0.1)", color:"#fff", fontSize:"16px", fontWeight:700, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              தொடங்குங்கள் →
            </button>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"12px", marginTop:"16px" }}>By Gopinath | @manifest.with.you</p>
          </div>
        )}

        {screen === "quiz" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px" }}>{current+1} / {questions.length}</span>
              <span style={{ background:"rgba(123,97,255,0.2)", color:"#b8a9ff", padding:"4px 12px", borderRadius:"20px", fontSize:"12px" }}>{questions[current].category}</span>
            </div>
            <div style={{ height:"4px", background:"rgba(255,255,255,0.08)", borderRadius:"2px", marginBottom:"20px" }}>
              <div style={{ height:"100%", width:`${(current/questions.length)*100}%`, background:"linear-gradient(90deg,#7b61ff,#00c896)", borderRadius:"2px", transition:"width 0.5s" }} />
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"20px", padding:"22px", marginBottom:"16px" }}>
              <p style={{ color:"#fff", fontSize:"clamp(15px,3vw,18px)", fontWeight:600, lineHeight:1.6, margin:0 }}>{questions[current].question}</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"20px" }}>
              {questions[current].options.map((opt,i)=>(
                <button key={i} onClick={()=>setSelected(opt.score)} style={{ padding:"14px 16px", borderRadius:"14px", textAlign:"left", background:selected===opt.score?"linear-gradient(135deg,rgba(123,97,255,0.3),rgba(90,63,232,0.2))":"rgba(255,255,255,0.04)", border:selected===opt.score?"1px solid rgba(123,97,255,0.7)":"1px solid rgba(255,255,255,0.08)", color:selected===opt.score?"#fff":"rgba(255,255,255,0.75)", fontSize:"14px", cursor:"pointer", fontFamily:"inherit" }}>
                  <span style={{ display:"inline-block", width:"20px", height:"20px", borderRadius:"50%", border:selected===opt.score?"2px solid #7b61ff":"2px solid rgba(255,255,255,0.2)", marginRight:"12px", verticalAlign:"middle", background:selected===opt.score?"#7b61ff":"transparent" }} />
                  {opt.text}
                </button>
              ))}
            </div>
            <button onClick={handleNext} disabled={selected===null} style={{ width:"100%", padding:"15px", borderRadius:"14px", background:selected!==null?"linear-gradient(135deg,#7b61ff,#5a3fe8)":"rgba(255,255,255,0.06)", color:selected!==null?"#fff":"rgba(255,255,255,0.3)", fontSize:"16px", fontWeight:700, border:"none", cursor:selected!==null?"pointer":"not-allowed", fontFamily:"inherit" }}>
              {current+1===questions.length?"முடிவு காண்க →":"அடுத்த கேள்வி →"}
            </button>
          </div>
        )}

        {screen === "result" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:"20px" }}>
              <div style={{ fontSize:"11px", letterSpacing:"4px", color:"#7b61ff" }}>manifest.with.you</div>
              <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.3)" }}>Mindset Assessment Results</div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${result.color}40`, borderRadius:"24px", padding:"28px", textAlign:"center", marginBottom:"16px" }}>
              <div style={{ fontSize:"52px", marginBottom:"8px" }}>{result.emoji}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"12px", marginBottom:"4px" }}>{name} — உங்கள் நிலை</div>
              <div style={{ fontSize:"28px", fontWeight:800, color:result.color, marginBottom:"4px" }}>{result.level}</div>
              <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)", marginBottom:"18px" }}>{result.subtitle}</div>
              <div style={{ height:"10px", background:"rgba(255,255,255,0.08)", borderRadius:"5px", overflow:"hidden", marginBottom:"6px" }}>
                <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${result.color}80,${result.color})`, borderRadius:"5px" }} />
              </div>
              <div style={{ textAlign:"right", color:result.color, fontSize:"13px", fontWeight:700 }}>{pct}% — {totalScore}/32</div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"18px", padding:"20px", marginBottom:"14px" }}>
              <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"14px", lineHeight:1.8, margin:0 }}>{result.desc}</p>
            </div>
            <div style={{ background:`linear-gradient(135deg,${result.color}18,${result.color}08)`, border:`1px solid ${result.color}40`, borderRadius:"18px", padding:"20px", marginBottom:"20px" }}>
              <div style={{ fontSize:"11px", color:result.color, letterSpacing:"2px", marginBottom:"8px", fontWeight:700 }}>✨ NEXT STEP</div>
              <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"14px", lineHeight:1.7, margin:0 }}>{result.action}</p>
            </div>
            <button onClick={handleRestart} style={{ width:"100%", padding:"14px", borderRadius:"14px", background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.7)", fontSize:"15px", fontWeight:600, border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer", fontFamily:"inherit", marginBottom:"16px" }}>
              மீண்டும் எடுக்க
            </button>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"12px", textAlign:"center" }}>@manifest.with.you | One Decision. 90 Days. New Life!</p>
          </div>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700;800&display=swap');`}</style>
    </div>
  );
}
