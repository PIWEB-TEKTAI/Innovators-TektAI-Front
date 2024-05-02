import React, { useEffect, useState } from 'react';
import ClientLayout from '../../layout/clientLayout';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import avtar from '../../images/avatar.jpg'
import { useAuth } from '../../components/Auth/AuthProvider';
import { io } from 'socket.io-client';
import { getUsers } from '../../services/auth.service';

const Chat: React.FC = () => {
    interface User {
        _id: string;
        email: string;
        FirstName: string;
        LastName: string;
        password: string;
        imageUrl: string;
        phone: string;
        address: string;
        birthDate: Date | null;
        occupation: string;
        Description: string;
        Education: string;
        Skills: string;
        isEmailVerified: boolean;
        state: 'validated' | 'not validated' | 'blocked';
        role: 'super admin' | 'admin' | 'challenger' | 'company' | 'archive';
    }
    const [data, setData] = useState([]);
    const [datauSER, setdataUser] = useState([]);
    const [messages, setMessage] = useState([]);
    const [msg, setMsg] = useState('');
    const [RecevirUser, setRecevirUser] = useState([]);
    const [chatroom, setChatroomId] = useState();
    const { userAuth } = useAuth();
    const [AllUsers, setAllUsers] = useState([]);
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        const fetchAllUsers = async () => {
            const res = await fetch(`http://localhost:3000/chatroom/getusers/${userAuth?._id}`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            const resData = await res.json()

            setAllUsers(resData);

        }
        fetchAllUsers()
    }, [])
    useEffect(() => {
        const fetchAllUsers = async () => {
            const res = await fetch(`http://localhost:3000/chatroom/getAllUsersCoonected/${userAuth?._id}`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            const resData = await res.json()

            setdataUser(resData);

        }
        fetchAllUsers()
    }, [])





    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Déconnexion du socket lorsque le composant est démonté
        };
    }, []);

    useEffect(() => {
        if (socket && userAuth) {
            console.log('Emitting addUser event with userAuth:', userAuth);
            data.forEach(userId => {
                socket.emit('addUser', userId);
            });
            console.log('Emitting addUser :', data);
            socket.on('getUsers', (users) => {
                console.log('Users received:', users);
                //setUsers(users);
            });
            socket?.on('getMessage', dataM => {
                console.log(dataM);
                setMessage(prev => ({
                    ...prev,
                    messages: [...prev.messages, { data, msg: dataM.msg }]
                }));
            });

            return () => {
                socket?.off('getMessage'); // Assurez-vous de retirer l'écouteur lorsque le composant est démonté
            };
        }
    }, [socket, userAuth]);


















    useEffect(() => {
        const fetchConversationId = async () => {
            try {
                const res = await fetch(`http://localhost:3000/chatroom/getconversetionIdBysenderandReceiverId/${userAuth?._id}/${RecevirUser?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });


                const resDataChatroom = await res.json();
                console.log(resDataChatroom)
                //setChatroomId(resDataChatroom);

                console.log(messages);
            } catch (error) {
                console.error('Error fetching messages and receiver user:', error);
                // Gérer les erreurs de requête API
            }
        }
        fetchConversationId()
    }, [])


    useEffect(() => {
        const fetchConversations = async () => {
            const res = await fetch(`http://localhost:3000/chatroom/getchatroomById/${userAuth?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            const resData = await res.json()

            setData(resData);

        }
        fetchConversations()
    }, [])



    // console.log(data)



    const handleSendMessage = async (userId) => {
        try {

            const senderId = userAuth?._id; // Vous devez obtenir cela dynamiquement ou à partir de l'état du composant
            const receiverId = userId;

            // Remplacez 'senderId' et 'receiverId' par les valeurs appropriées
            // ID de l'utilisateur auquel vous voulez envoyer le message

            // Envoyer une requête POST pour créer la conversation
            const response = await axios.post('http://localhost:3000/chatroom/addchatroom', {
                senderId,
                receiverId
            });

            console.log(response.data); // Affiche la réponse de l'API
            // setAllUsers(prevUsers => prevUsers.filter(user => user.userId !== receiverId));
            window.location.reload();
            // Affichez un message de confirmation ou mettez à jour l'état de votre composant si nécessaire
        } catch (error) {
            console.error('Error creating chatroom:', error);
        }

    };




    const fetchMessage = async (user, userReceiver) => {
        try {
            const res = await fetch(`http://localhost:3000/chatroom/getMessage/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const resData = await res.json();
            setMessage(resData);

            const reseiver = await fetch(`http://localhost:3000/chatroom/getReceiverUserBySenderIdAndconversationId/${user}/${userAuth._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setChatroomId(user)
            const resDataReceiver = await reseiver.json();
            setRecevirUser(resDataReceiver);

            //console.log(messages);
        } catch (error) {
            console.error('Error fetching messages and receiver user:', error);
            // Gérer les erreurs de requête API
        }
    };


    const sendMessage = async (e) => {
        console.log('Sending message:', msg);


        //fetchMessage(userAuth?.id,RecevirUser?.id)
        setMsg('');
        try {
            const resData = await fetch(`http://localhost:3000/chatroom/addMessage/${userAuth?._id}/${RecevirUser?.id}/${chatroom}/${msg}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: msg }) // Ajoutez le corps de la requête avec le message à envoyer
            });

            const resDataMsg = await resData.json();
            console.log(chatroom);

            //setMessage(resDataMsg)
        } catch (error) {
            console.error('Error sending message:', error);
            // Gérer les erreurs, par exemple en affichant un message à l'utilisateur
        }

        socket?.emit('sendMessage', {
            senderId: userAuth?.id,
            receiverId: RecevirUser?.id,
            msg,
            conversationId: chatroom


        })
    };


    /*useEffect(() => {
        fetchData();
        console.log(data); // Vérifiez les données après chaque mise à jour
    }, []); // Fetch data again when selectedRole or searchTerm changes

    const fetchData = () => {
        axios.get<User[]>(`http://localhost:3000/chatroom/getchatroomById/${userAuth?._id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    };*/
    return (
        <div className='w-screen flex' >
            <div className='w-[25%] h-screen shadow-lg   bg-[#eledff] p-6 flex flex-col'>
                <div className='flex items-center my-3 '>
                    <div className='border border-primary p-[2px] rounded-full '>
                        <img src={userAuth?.imageUrl} width={50} height={50} className="rounded-full" />
                    </div>
                    <div className='ml-4'>
                        <h3 className='text-lg font-bold'>{userAuth?.FirstName} {userAuth?.LastName}</h3>
                        <p className='text-sm text-gray-500'>My Accounts</p>
                    </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />


                <div className="flex-1 overflow-y-auto ">

                    <div><h3>Messages</h3></div>

                    {
                        data.length > 0 ?


                            Array.isArray(data) && data.map(({ chatroomId, user, index }) => (
                                <div className='flex items-center  py-3 ' onClick={() => fetchMessage(chatroomId, user)} >
                                    <div className='border border-primary p-[2px] rounded-full' >
                                        <img src={user?.image} width={50} height={50} alt="Avatar" className="rounded-full" />
                                    </div>
                                    <div className='ml-4'>
                                        <h3 className='text-xlg font-bold'>{user?.firstname} {user?.lastname}</h3>
                                        <p className='text-sm text-gray-500'>{user?.email}</p>
                                    </div>
                                </div>
                            )) : <div className='text-center text-lg font-semibold  mt-24'>No Conversations</div>
                    }
                </div>
            </div>

            <div className='w-[60%] bg-white h-screen shadow-lg flex flex-col items-center py-4' >
            <div className={`w-3/4 bg-slate-100 h-16 mt-14 rounded-full flex items-center px-4 ${!fetchMessage && 'hidden'}`}>
    <img src={RecevirUser?.image ?? userAuth?.imageUrl} width={50} height={50} className="rounded-full mr-4 cursor-pointer" alt="Avatar" />
    <div className='ml-6 mr-auto'>
        <h3 className='text-lg'>{RecevirUser?.firstname ?? userAuth?.FirstName} {RecevirUser?.lastname ?? userAuth?.LastName}</h3>
        <p className='text-sm font-light text-gray-600'>{RecevirUser?.email ?? userAuth?.email}</p>
    </div>
    <div className='cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-call" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#326A85" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            <path d="M15 7a2 2 0 0 1 2 2" />
            <path d="M15 3a6 6 0 0 1 6 6" />
        </svg>
    </div>
</div>

                <div className='h-[950px] w-full overflow-scroll'>
                    <div className='h-[1000px] px-6 py-6 flex flex-col gap-4'>



                        {
                            messages.length > 0 ? (
                                Array.isArray(messages) && messages.map(({ message, user }) => {
                                    const userId = user?.id; // Vérification de nullité sur user
                                    const isSentByCurrentUser = userId === userAuth?._id; // Assurez-vous que userAuth est bien défini

                                    return (
                                        <div className={`max-w-[50%] rounded-b-xl p-4 mb-4 ${isSentByCurrentUser ? 'bg-secondary rounded-tl-xl ml-auto' : 'bg-slate-300 rounded-tr-xl mr-auto'}`}>
                                            {message}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation selected  </div>
                            )
                        }








                    </div>
                </div>


                <div className={`p-4 w-full bg-gray-100 flex items-center  ${!fetchMessage && 'hidden'}`} >
                    <input
                        type="text"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Write a message here..."
                        className="flex-1 px-4 py-2 mr-4 rounded-full bg-white focus:outline-none focus:shadow-outline border border-gray-300"
                    />
                    <button className={`p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded-full focus:outline-none ${!msg && 'pointer-events-none'}`} onClick={() => sendMessage()} >
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                            <path d="M6.5 12h14.5" />
                        </svg>
                    </button>


                    <button className={`p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded-full focus:outline-none m-2 ${!msg && 'pointer-events-none'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </button>
                </div>


            </div>

            <div className='w-[25%] h-screen px-8  py-16'>

                <div className='text-primary text-lg'>People</div>
                <div>
                    {Array.isArray(AllUsers) && AllUsers.map(({ userId, user, index }) => (
                        <div key={userId} className='flex items-center py-3'>
                            <div className='border border-primary p-[2px] rounded-full'>
                                <img src={user?.image} width={50} height={50} alt="Avatar" className="rounded-full" />
                            </div>
                            <div className='ml-4'>
                                <h3 className='text-xlg font-bold'>{user?.firstname} {user?.lastname}</h3>
                                <p className='text-sm text-gray-500'>{user?.email}</p>
                                <button onClick={() => handleSendMessage(userId)} className='bg-blue-500 text-white px-4 py-2 rounded-full mt-2'>
                                    Send a Message
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    );
};

export default Chat;
