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

const PASSWORD = "0328";

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
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
        padding: '1rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#c2185b' }}>💒 結婚式準備管理</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>パスワードを入力してください</p>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="パスワードを入力"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s'
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: 'linear-gradient(135deg, #ec407a 0%, #c2185b 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(194, 24, 91, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
    <div style={{ marginTop: '1.5rem' }}>
      {taskList.map(task => (
        <div key={task.id} style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '0.75rem',
          background: task.completed ? '#f5f5f5' : 'white',
          border: '1px solid #e0e0e0',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }} 
        onClick={() => toggleTask(task.id)}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            style={{ 
              marginRight: '1rem', 
              marginTop: '0.25rem', 
              cursor: 'pointer',
              width: '18px',
              height: '18px',
              accentColor: '#c2185b'
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#9e9e9e' : '#212121',
              fontSize: '1rem',
              lineHeight: '1.6',
              fontWeight: task.completed ? '400' : '500'
            }}>{task.title}</p>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#757575', 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span>📅</span> {task.deadline}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            color: '#c2185b',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>💒 結婚式準備管理サイト</h1>
          <p style={{ color: '#666', fontSize: '1.125rem' }}>2026年3月28日（土）挙式・披露宴</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            marginBottom: '1.5rem',
            color: '#c2185b',
            borderBottom: '3px solid #f8bbd0',
            paddingBottom: '0.5rem'
          }}>📋 基本情報</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '8px' }}>
              <p style={{ fontWeight: '700', color: '#c2185b', marginBottom: '0.5rem' }}>🕐 挙式日時</p>
              <p style={{ color: '#424242' }}>2026年3月28日（土）13:30〜</p>
            </div>
            <div style={{ padding: '1rem', background: '#f3e5f5', borderRadius: '8px' }}>
              <p style={{ fontWeight: '700', color: '#8e24aa', marginBottom: '0.5rem' }}>🍽️ 披露宴</p>
              <p style={{ color: '#424242' }}>15:00〜17:00</p>
            </div>
            <div style={{ padding: '1rem', background: '#e1f5fe', borderRadius: '8px' }}>
              <p style={{ fontWeight: '700', color: '#0277bd', marginBottom: '0.5rem' }}>🏛️ 会場</p>
              <p style={{ color: '#424242' }}>3F チャペル / 4F 宴会場</p>
            </div>
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '8px' }}>
              <p style={{ fontWeight: '700', color: '#e65100', marginBottom: '0.5rem' }}>📅 次回打ち合わせ</p>
              <p style={{ color: '#424242' }}>2nd Meeting（日程未定）</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            color: '#c2185b',
            borderBottom: '3px solid #f8bbd0',
            paddingBottom: '0.5rem'
          }}>✅ ToDoリスト</h2>
          <p style={{ 
            color: '#666', 
            marginBottom: '1.5rem',
            fontSize: '1rem',
            marginTop: '1rem'
          }}>
            完了: <strong style={{ color: '#c2185b', fontSize: '1.25rem' }}>{tasks.filter(t => t.completed).length}</strong> / {tasks.length}
          </p>

          <div style={{ 
            borderBottom: '2px solid #f0f0f0', 
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab("next")}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeTab === "next" ? 'linear-gradient(135deg, #ec407a 0%, #c2185b 100%)' : 'transparent',
                  color: activeTab === "next" ? 'white' : '#666',
                  border: 'none',
                  borderBottom: activeTab === "next" ? 'none' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === "next" ? '700' : '500',
                  fontSize: '1rem',
                  borderRadius: activeTab === "next" ? '8px 8px 0 0' : '0',
                  transition: 'all 0.3s'
                }}
              >
                次回まで ({nextTasks.filter(t => !t.completed).length})
              </button>
              <button
                onClick={() => setActiveTab("third")}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeTab === "third" ? 'linear-gradient(135deg, #ab47bc 0%, #8e24aa 100%)' : 'transparent',
                  color: activeTab === "third" ? 'white' : '#666',
                  border: 'none',
                  borderBottom: activeTab === "third" ? 'none' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === "third" ? '700' : '500',
                  fontSize: '1rem',
                  borderRadius: activeTab === "third" ? '8px 8px 0 0' : '0',
                  transition: 'all 0.3s'
                }}
              >
                3rdまで ({thirdTasks.filter(t => !t.completed).length})
              </button>
              <button
                onClick={() => setActiveTab("deadline")}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeTab === "deadline" ? 'linear-gradient(135deg, #ff9800 0%, #e65100 100%)' : 'transparent',
                  color: activeTab === "deadline" ? 'white' : '#666',
                  border: 'none',
                  borderBottom: activeTab === "deadline" ? 'none' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === "deadline" ? '700' : '500',
                  fontSize: '1rem',
                  borderRadius: activeTab === "deadline" ? '8px 8px 0 0' : '0',
                  transition: 'all 0.3s'
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

