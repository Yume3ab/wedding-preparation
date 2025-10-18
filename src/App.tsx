import { useState, useEffect } from 'react'
import './App.css'

interface Task {
  id: string;
  title: string;
  category: string;
  deadline: string;
  completed: boolean;
}

const INITIAL_TASKS: Task[] = [
  // 次回打ち合わせまで
  { id: "1", title: "らんちゃん（ペットの犬）見る親族の人決める", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "2", title: "親族で宿泊する人と支払いの方法（各自かどうか）", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "3", title: "挙式の新郎入場時のジャケットグローブのやつやるか決めとく", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "4", title: "結婚証明書持ち込むかどうか決める（らんちゃんがおす場合は事前に）", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "5", title: "サンクスギビングパーティやるか決める", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "6", title: "ケーキレシピやデザインを決める", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "7", title: "手紙朗読するかどうか決めとく", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "8", title: "花束、記念品の方向性決める", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "9", title: "プチギフトのセレクトについて方向性を決める", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "10", title: "席次振っとく", category: "next", deadline: "次回打ち合わせまで", completed: false },
  { id: "11", title: "引き出物と引菓子を決めておく（もっと早く決まればメールで連絡）", category: "next", deadline: "次回打ち合わせまで", completed: false },
  
  // 3rdミーティングまで
  { id: "12", title: "当日ゲストの人で着付けする人は専用サイトから申し込み→内容に間違いないか後日確認", category: "third", deadline: "3rdミーティングまで", completed: false },
  { id: "13", title: "挨拶する主賓の名前と肩書きを決めて確認しておく", category: "third", deadline: "3rdミーティングまで", completed: false },
  
  // 期限付き
  { id: "14", title: "受付の人決める", category: "deadline", deadline: "未定", completed: false },
  { id: "15", title: "ご祝儀袋用バッグを用意する（エコバッグとかでもいいから大きめの）", category: "deadline", deadline: "未定", completed: false },
  { id: "16", title: "リングピロー用意する", category: "deadline", deadline: "未定", completed: false },
  { id: "17", title: "披露宴　中座のエスコート母親、伝えておく", category: "deadline", deadline: "未定", completed: false },
  { id: "18", title: "試食会12月14日か1月12日に参加するか決める→3週間前までにメール", category: "deadline", deadline: "試食会3週間前まで", completed: false },
  { id: "19", title: "招待状のドラフト確認してもらう、リストもほぼ確定してると良い", category: "deadline", deadline: "11月中", completed: false },
];

const PASSWORD = "wedding2026";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("next");

  useEffect(() => {
    const auth = localStorage.getItem("wedding-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }

    const savedTasks = localStorage.getItem("wedding-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(INITIAL_TASKS);
    }
  }, []);

  const handleLogin = () => {
    if (password === PASSWORD) {
      localStorage.setItem("wedding-auth", "true");
      setIsAuthenticated(true);
    } else {
      alert("パスワードが正しくありません");
    }
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("wedding-tasks", JSON.stringify(updatedTasks));
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #fce4ec, #f3e5f5)',
        padding: '1rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 5vw, 1.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>結婚式準備管理</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>パスワードを入力してください</p>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="パスワードを入力"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: 'clamp(0.875rem, 3vw, 1rem)',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            ログイン
          </button>
        </div>
      </div>
    );
  }

  const nextTasks = tasks.filter(t => t.category === "next");
  const thirdTasks = tasks.filter(t => t.category === "third");
  const deadlineTasks = tasks.filter(t => t.category === "deadline");

  const renderTasks = (taskList: Task[]) => (
    <div style={{ marginTop: '1rem' }}>
      {taskList.map(task => (
        <div key={task.id} style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: 'clamp(0.5rem, 2vw, 0.75rem)',
          borderRadius: '8px',
          marginBottom: '0.5rem',
          background: '#f9fafb',
          cursor: 'pointer'
        }} onClick={() => toggleTask(task.id)}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            style={{ 
              marginRight: 'clamp(0.5rem, 2vw, 0.75rem)', 
              marginTop: '0.25rem', 
              cursor: 'pointer',
              minWidth: '16px',
              minHeight: '16px'
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#9ca3af' : '#000',
              fontSize: 'clamp(0.875rem, 3vw, 1rem)',
              lineHeight: '1.5'
            }}>{task.title}</p>
            <p style={{ 
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', 
              color: '#6b7280', 
              marginTop: '0.25rem' 
            }}>{task.deadline}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #fce4ec, #f3e5f5)',
      padding: 'clamp(0.5rem, 3vw, 1rem)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 'clamp(1rem, 4vw, 2rem)' }}>
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            lineHeight: '1.2'
          }}>結婚式準備管理</h1>
          <p style={{ color: '#666', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>2026年3月28日 挙式・披露宴</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
            fontWeight: 'bold', 
            marginBottom: '1rem' 
          }}>基本情報</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: 'clamp(0.75rem, 2vw, 1rem)' 
          }}>
            <div>
              <p style={{ fontWeight: '600', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>挙式日時</p>
              <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }}>2026年3月28日（土）13:30〜</p>
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>披露宴</p>
              <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }}>15:00〜17:00</p>
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>会場</p>
              <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }}>3F チャペル / 4F 宴会場</p>
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>次回打ち合わせ</p>
              <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }}>2nd Meeting（日程未定）</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem' 
          }}>ToDoリスト</h2>
          <p style={{ 
            color: '#666', 
            marginBottom: '1rem',
            fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)'
          }}>
            完了: {tasks.filter(t => t.completed).length} / {tasks.length}
          </p>

          <div style={{ 
            borderBottom: '1px solid #e5e7eb', 
            marginBottom: '1rem', 
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}>
            <div style={{ display: 'flex', gap: '0.25rem', minWidth: 'max-content' }}>
              <button
                onClick={() => setActiveTab("next")}
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
                  background: activeTab === "next" ? 'white' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === "next" ? '2px solid #2563eb' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === "next" ? '600' : '400',
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                  whiteSpace: 'nowrap'
                }}
              >
                次回まで ({nextTasks.filter(t => !t.completed).length})
              </button>
              <button
                onClick={() => setActiveTab("third")}
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
                  background: activeTab === "third" ? 'white' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === "third" ? '2px solid #2563eb' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === "third" ? '600' : '400',
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                  whiteSpace: 'nowrap'
                }}
              >
                3rdまで ({thirdTasks.filter(t => !t.completed).length})
              </button>
              <button
                onClick={() => setActiveTab("deadline")}
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
                  background: activeTab === "deadline" ? 'white' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === "deadline" ? '2px solid #2563eb' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === "deadline" ? '600' : '400',
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                  whiteSpace: 'nowrap'
                }}
              >
                期限付き ({deadlineTasks.filter(t => !t.completed).length})
              </button>
            </div>
          </div>

          {activeTab === "next" && renderTasks(nextTasks)}
          {activeTab === "third" && renderTasks(thirdTasks)}
          {activeTab === "deadline" && renderTasks(deadlineTasks)}
        </div>
      </div>
    </div>
  );
}

export default App

