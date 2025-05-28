import React, { useState } from 'react';
import { Plus, Search, MessageSquare, Users, Clock, X, Upload, Trash2 } from 'lucide-react';
import styles from './Forums.module.css';

const Forums = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForum, setSelectedForum] = useState<number | null>(null);
  const [newPost, setNewPost] = useState('');
  const [showNewForumModal, setShowNewForumModal] = useState(false);
  const [forums, setForums] = useState<Array<{
    id: number;
    title: string;
    description: string;
    course: string;
    posts: number;
    lastActivity: string;
    participants: number;
  }>>([]);
  const [newForumData, setNewForumData] = useState({
    title: '',
    course: '',
    openDate: '',
    closeDate: '',
    allowStudentReplies: false,
    attachment: null as File | null
  });

  const courses = [
    'Inglés III - G16',
    'Sistemas Operativos - G2',
    'Ingeniería de Software - G4'
  ];

  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    forum.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectForum = (forumId: number) => {
    setSelectedForum(forumId);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New post submitted:', newPost);
    setNewPost('');
  };

  const handleNewForumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newForum = {
      id: Date.now(),
      title: newForumData.title,
      description: `Foro de discusión para ${newForumData.course}`,
      course: newForumData.course,
      posts: 0,
      lastActivity: new Date().toISOString().split('T')[0],
      participants: 0
    };

    setForums([...forums, newForum]);
    setShowNewForumModal(false);
    setNewForumData({
      title: '',
      course: '',
      openDate: '',
      closeDate: '',
      allowStudentReplies: false,
      attachment: null
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewForumData({
        ...newForumData,
        attachment: e.target.files[0]
      });
    }
  };

  const handleDeleteForum = (forumId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent forum selection when clicking delete
    const updatedForums = forums.filter(forum => forum.id !== forumId);
    setForums(updatedForums);
    if (selectedForum === forumId) {
      setSelectedForum(null);
    }
  };

  return (
    <div className={styles.forumsPage}>
      <div className={styles.pageHeader}>
        <h1>Foros de Discusión</h1>
        <button 
          className={styles.newForumButton}
          onClick={() => setShowNewForumModal(true)}
        >
          <Plus size={16} /> Nuevo Foro
        </button>
      </div>

      <div className={styles.forumsLayout}>
        <div className={styles.forumsList}>
          <div className={styles.forumsHeader}>
            <h2>Foros Disponibles</h2>
            <div className={styles.searchBox}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar foro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.forumItems}>
            {filteredForums.map((forum) => (
              <div
                key={forum.id}
                className={`${styles.forumItem} ${selectedForum === forum.id ? styles.selectedForum : ''}`}
                onClick={() => handleSelectForum(forum.id)}
              >
                <div className={styles.forumIcon}>
                  <MessageSquare size={20} />
                </div>
                <div className={styles.forumInfo}>
                  <h3>{forum.title}</h3>
                  <p>{forum.description}</p>
                  <div className={styles.forumMeta}>
                    <span className={styles.metaItem}>
                      <MessageSquare size={14} /> {forum.posts} posts
                    </span>
                    <span className={styles.metaItem}>
                      <Users size={14} /> {forum.participants} participantes
                    </span>
                    <span className={styles.metaItem}>
                      <Clock size={14} /> {forum.lastActivity}
                    </span>
                  </div>
                </div>
                <button 
                  className={styles.deleteButton}
                  onClick={(e) => handleDeleteForum(forum.id, e)}
                  title="Eliminar foro"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {filteredForums.length === 0 && (
              <div className={styles.noForums}>
                <p>No hay foros disponibles</p>
              </div>
            )}
          </div>
        </div>

        {selectedForum && (
          <div className={styles.forumContent}>
            <div className={styles.forumHeader}>
              <h2>{forums.find(f => f.id === selectedForum)?.title}</h2>
              <p>{forums.find(f => f.id === selectedForum)?.description}</p>
            </div>

            <div className={styles.postsList}>
              <div className={styles.newPostForm}>
                <h3>Escribir nueva publicación</h3>
                <form onSubmit={handleSubmitPost}>
                  <textarea
                    placeholder="Escribe tu mensaje aquí..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={4}
                  ></textarea>
                  <button type="submit" className={styles.submitButton}>
                    Publicar
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {showNewForumModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Crear Nuevo Foro</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowNewForumModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewForumSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="forumTitle">Título del foro</label>
                  <input
                    type="text"
                    id="forumTitle"
                    value={newForumData.title}
                    onChange={(e) => setNewForumData({...newForumData, title: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="forumCourse">Curso</label>
                  <select
                    id="forumCourse"
                    value={newForumData.course}
                    onChange={(e) => setNewForumData({...newForumData, course: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar curso</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.dateInputs}>
                    <div>
                      <label htmlFor="openDate">Fecha de apertura</label>
                      <input
                        type="date"
                        id="openDate"
                        value={newForumData.openDate}
                        onChange={(e) => setNewForumData({...newForumData, openDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="closeDate">Fecha de cierre</label>
                      <input
                        type="date"
                        id="closeDate"
                        value={newForumData.closeDate}
                        onChange={(e) => setNewForumData({...newForumData, closeDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="allowReplies"
                      checked={newForumData.allowStudentReplies}
                      onChange={(e) => setNewForumData({...newForumData, allowStudentReplies: e.target.checked})}
                    />
                    <label htmlFor="allowReplies">Permitir respuestas entre estudiantes</label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="attachment">Archivo adjunto</label>
                  <label className={styles.fileInput} htmlFor="attachment">
                    <Upload className={styles.fileInputIcon} size={20} />
                    <span className={styles.fileInputText}>
                      {newForumData.attachment
                        ? newForumData.attachment.name
                        : 'Haz clic para subir un archivo'}
                    </span>
                    <input
                      type="file"
                      id="attachment"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowNewForumModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.createButton}>
                  Crear Foro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forums;