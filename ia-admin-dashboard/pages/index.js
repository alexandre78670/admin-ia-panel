import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

export default function Home() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [conversation, setConversation] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'conversations'))
      const userList = usersSnapshot.docs.map(doc => ({ id: doc.id }))
      setUsers(userList)
    }
    fetchUsers()
  }, [])

  const loadConversation = async (userId) => {
    const docRef = doc(db, 'conversations', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setConversation(docSnap.data().history || '')
      setSelectedUser(userId)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <div className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Utilisateurs</h2>
        <ul>
          {users.map(user => (
            <li
              key={user.id}
              className={`p-2 rounded cursor-pointer hover:bg-blue-100 ${selectedUser === user.id ? 'bg-blue-200' : ''}`}
              onClick={() => loadConversation(user.id)}
            >
              {user.id}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Conversation</h2>
        <div className="bg-white rounded shadow p-4 whitespace-pre-wrap">
          {conversation || 'Clique sur un utilisateur pour voir sa conversation.'}
        </div>
      </div>
    </div>
  )
}