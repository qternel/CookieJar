import { useEffect, useState } from "react"; // TODO: Добавить axios при подключении бэкенда
import "./Profile.css";

export default function Profile() {
  // TODO: Заменить моковые данные на запрос к бэкенду
  const [profileData, setProfileData] = useState({
    login: "CookieMaster",
    cookies: 127,
    joinDate: "2025-05-20T14:30:00Z", // TODO: Получать с бэкенда
    achievements: [] // TODO: Получать с бэкенда
  });

  // TODO: Раскомментировать и настроить при подключении бэкенда
  /*
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile', { 
          withCredentials: true 
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    };
    
    fetchProfile();
  }, []);
  */

  return (
    <div className="fullscreenProfile">
      {/* Шапка профиля */}
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

      {/* Основной контент */}
      <div className="fullWidthContent">
        <h2>Мои достижения</h2>
        <div className="achievementsContainer">
          {profileData.achievements.length > 0 ? (
            profileData.achievements.map((achievement, i) => (
              <div key={i} className="achievementTile">
                <div className="achievementEmoji">🏆</div>
                <div className="achievementText">
                  <h3>{achievement.description}</h3>
                  <p>Получено: {achievement.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="noAchievements">Нет достижений</p>
          )}
        </div>
      </div>
    </div>
  );
}