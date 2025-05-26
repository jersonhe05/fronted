import React, { useState } from 'react';
import { Plus, MessageSquare, Search, Users, Clock } from 'lucide-react';
import styles from './Forums.module.css';

const Forums = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForum, setSelectedForum] = useState<number | null>(1);
  const [newPost, setNewPost] = useState('');

  const forums = [
    {
      id: 1,
      title: 'Discusión: Phrasal Verbs',
      description: 'Espacio para discutir los phrasal verbs vistos en clase',
      course: 'Inglés III - G16',
      posts: 8,
      lastActivity: '2023-05-15',
      participants: 12
    },
    {
      id: 2,
      title: 'Dudas sobre el proyecto final',
      description: 'Preguntas y respuestas sobre el proyecto final del curso',
      course: 'Inglés III - G16',
      posts: 15,
      lastActivity: '2023-05-14',
      participants: 20
    },
    {
      id: 3,
      title: 'Recursos adicionales',
      description: 'Compartir recursos útiles para el aprendizaje de inglés',
      course: 'Inglés III - G16',
      posts: 5,
      lastActivity: '2023-05-10',
      participants: 8
    }
  ];

  const posts = [
    {
      id: 1,
      forumId: 1,
      author: 'Juan Pérez',
      role: 'Profesor',
      content: 'En este foro discutiremos los phrasal verbs vistos en clase. Recuerden que un phrasal verb es una combinación de un verbo y una o más partículas (preposiciones o adverbios) que forman una unidad semántica.',
      date: '2023-05-15 10:30',
      replies: []
    },
    {
      id: 2,
      forumId: 1,
      author: 'Ana González',
      role: 'Estudiante',
      content: 'Profesor, tengo una duda sobre la diferencia entre "look up" y "look for". ¿Podría explicarnos?',
      date: '2023-05-15 11:15',
      replies: [
        {
          id: 3,
          author: 'Juan Pérez',
          role: 'Profesor',
          content: 'Buena pregunta Ana. "Look up" significa buscar información en una fuente de referencia como un diccionario o en internet. "Look for" significa buscar algo que has perdido o que necesitas encontrar.',
          date: '2023-05-15 11:30'
        },
        {
          id: 4,
          author: 'Carlos Rodríguez',
          role: 'Estudiante',
          content: '¡Gracias profesor! Eso aclara mi duda también.',
          date: '2023-05-15 11:45'
        }
      ]
    },
    {
      id: 5,
      forumId: 1,
      author: 'Diana Martínez',
      role: 'Estudiante',
      content: '¿Podríamos tener una lista de los phrasal verbs más comunes que serán evaluados en el examen?',
      date: '2023-05-15 14:20',
      replies: [
        {
          id: 6,
          author: 'Juan Pérez',
          role: 'Profesor',
          content: 'Claro Diana, subiré una lista con los 50 phrasal verbs más comunes que deben conocer para el examen. La encontrarán en la sección de recursos del curso.',
          date: '2023-05-15 15:05'
        }
      ]
    }
  ];

  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    forum.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentForumPosts = posts.filter((post) => post.forumId === selectedForum);

  const handleSelectForum = (forumId: number) => {
    setSelectedForum(forumId);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the post to the backend
    console.log('New post submitted:', newPost);
    setNewPost('');
  };

  return (
    <div className={styles.forumsPage}>
      <div className={styles.pageHeader}>
        <h1>Foros de Discusión</h1>
        <button className={styles.newForumButton}>
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
              </div>
            ))}
          </div>
        </div>

        {selectedForum && (
          <div className={styles.forumContent}>
            <div className={styles.forumHeader}>
              <h2>{forums.find(f => f.id === selectedForum)?.title}</h2>
              <p>{forums.find(f => f.id === selectedForum)?.description}</p>
            </div>

            <div className={styles.postsList}>
              {currentForumPosts.map((post) => (
                <div key={post.id} className={styles.postItem}>
                  <div className={styles.postHeader}>
                    <div className={styles.authorInfo}>
                      <div className={styles.authorAvatar}>
                        {post.author.charAt(0)}
                      </div>
                      <div className={styles.authorDetails}>
                        <span className={styles.authorName}>{post.author}</span>
                        <span className={styles.authorRole}>{post.role}</span>
                      </div>
                    </div>
                    <span className={styles.postDate}>{post.date}</span>
                  </div>
                  <div className={styles.postContent}>
                    <p>{post.content}</p>
                  </div>
                  {post.replies.length > 0 && (
                    <div className={styles.repliesList}>
                      {post.replies.map((reply) => (
                        <div key={reply.id} className={styles.replyItem}>
                          <div className={styles.replyHeader}>
                            <div className={styles.authorInfo}>
                              <div className={styles.authorAvatar}>
                                {reply.author.charAt(0)}
                              </div>
                              <div className={styles.authorDetails}>
                                <span className={styles.authorName}>{reply.author}</span>
                                <span className={styles.authorRole}>{reply.role}</span>
                              </div>
                            </div>
                            <span className={styles.postDate}>{reply.date}</span>
                          </div>
                          <div className={styles.postContent}>
                            <p>{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={styles.postActions}>
                    <button className={styles.replyButton}>Responder</button>
                  </div>
                </div>
              ))}
            </div>

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
        )}
      </div>
    </div>
  );
};

export default Forums;