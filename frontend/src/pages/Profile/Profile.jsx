import { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../hooks/useAuth";
import { useAchievements } from "../../hooks/useAchievements";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', 
    {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
  });
};



export default function Profile() {
  const { user, logout } = useAuth();
  const { CreateAchievement, isAdding } = useAchievements();

  // Состояние для формы
  const [newAchievement, setNewAchievement] = useState("");
  const [error, setError] = useState("");

  const handleAddAchievement = async (e) => {
    e.preventDefault();

    if (!newAchievement.trim()) {
      setError("Пожалуйста, опишите достижение");
      return;
    }

    CreateAchievement(newAchievement);
  };

  return (
    <div className="fullscreenProfile">
      {/* Шапка профиля (на всю ширину) */}
      <div className="profileBanner">
        <div className="bannerContent">
          <div className="avatar">🍪</div>
          <h1>{user.login}</h1>
          <button onClick={logout}>Выйти</button>

          <div className="stats">
            <div className="stat">
              <span className="statNumber">{user.cookies}</span>
              <span className="statLabel">Печенек</span>
            </div>
            <div className="stat">
              <span className="statNumber">{user.achievements.length}</span>
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
            <form
              onSubmit={handleAddAchievement}
              className="addAchievementForm"
            >
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
              {user.achievements.length > 0 ? (
                user.achievements.map((achievement) => (
                  <div key={achievement.id} className="achievementTile">
                    <div className="achievementEmoji">🏆</div>
                    <div className="achievementText">
                      <h3>{achievement.description}</h3>
                      <p>Получено {achievement.cookie_count} печенек</p>
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
