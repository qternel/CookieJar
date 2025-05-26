import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  // Состояние профиля
  const [profileData, setProfileData] = useState({
    login: "CookieMaster",
    cookies: 127,
    joinDate: "2025-05-20T14:30:00Z",
    achievements: [
      { id: 1, description: "Первая печенька", date: "2025-05-21" },
      { id: 2, description: "Недельный streak", date: "2025-05-28" }
    ]
  });

  // Состояние для формы
  const [newAchievement, setNewAchievement] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    
    if (!newAchievement.trim()) {
      setError("Пожалуйста, опишите достижение");
      return;
    }

    setIsAdding(true);
    
    try {
      // TODO: Заменить на реальный запрос к бэкенду
      console.log("Отправка достижения:", { description: newAchievement });
      
      // Моковая обработка (удалить при подключении бэкенда)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newAchievementObj = {
        id: Date.now(),
        description: newAchievement,
        date: new Date().toLocaleDateString()
      };
      
      setProfileData(prev => ({
        ...prev,
        achievements: [newAchievementObj, ...prev.achievements]
      }));
      
      setNewAchievement("");
      setError("");
    } catch (err) {
      setError("Ошибка при добавлении");
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="fullscreenProfile">
      {/* Шапка профиля (на всю ширину) */}
      <div className="profileBanner">
        <div className="bannerContent">
          <div className="avatar">🍪</div>
          <h1>{profileData.login}</h1>
          
          <div className="profileMeta">
            <p>Зарегистрирован: {new Date(profileData.joinDate).toLocaleDateString()}</p>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="statNumber">{profileData.cookies}</span>
              <span className="statLabel">Печенек</span>
            </div>
            <div className="stat">
              <span className="statNumber">{profileData.achievements.length}</span>
              <span className="statLabel">Достижений</span>
            </div>
          </div>
        </div>
      </div>

      {/* Основное содержимое (на всю ширину) */}
      <div className="profileContent">
        <div className="contentWrapper">
          {/* Секция добавления достижения */}
          <div className="addAchievementSection">
            <h2 className="sectionTitle">Добавить новое достижение</h2>
            <form onSubmit={handleAddAchievement} className="addAchievementForm">
              <div className="formRow">
                <textarea
                  value={newAchievement}
                  onChange={(e) => {
                    setNewAchievement(e.target.value);
                    setError("");
                  }}
                  placeholder="Опишите ваше достижение..."
                  className="achievementInput"
                  disabled={isAdding}
                  rows="3"
                />
                <button 
                  type="submit" 
                  className="addButton"
                  disabled={isAdding || !newAchievement.trim()}
                >
                  {isAdding ? "Добавляем..." : "Добавить"}
                </button>
              </div>
              {error && <div className="errorMessage">{error}</div>}
            </form>
          </div>

          {/* Секция списка достижений */}
          <div className="achievementsSection">
            <div className="achievementsHeader">
              <h2>Мои достижения</h2>
            </div>
            <div className="achievementsContainer">
              {profileData.achievements.length > 0 ? (
                profileData.achievements.map((achievement) => (
                  <div key={achievement.id} className="achievementTile">
                    <div className="achievementEmoji">🏆</div>
                    <div className="achievementText">
                      <h3>{achievement.description}</h3>
                      <p>Получено: {achievement.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="noAchievements">Пока нет достижений</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}