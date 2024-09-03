// import React, { useEffect, useState } from 'react';
// import './OnlineUsers.css';
// import { GoPerson } from 'react-icons/go';

// function AdminAllUsers() {
//     const [allUsers, setAllUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedFilters, setSelectedFilters] = useState([]);
//     const [sortOrder, setSortOrder] = useState('asc'); // Track sorting order

//     async function getData() {
//         let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/getAllUsers`);
//         data = await data.json();
//         console.log(data);
//         setAllUsers(data);
//     }

//     useEffect(() => {
//         getData();
//     }, []);

//     const escapeRegExp = (string) => {
//         return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters for regex
//     };

//     const handleDrop = (filterName) => {
//         setSelectedFilters((prevFilters) =>
//             prevFilters.includes(filterName) ? prevFilters : [...prevFilters, filterName]
//         );
//     };

//     const filteredUsers = allUsers.filter((user) => {
//         const regex = new RegExp(escapeRegExp(searchTerm), 'i');
//         return selectedFilters.some((filter) => regex.test(user[filter]));
//     });

//     const sortByUsername = () => {
//         const sortedUsers = [...allUsers].sort((a, b) => {
//             if (sortOrder === 'asc') {
//                 return a.userName.localeCompare(b.userName);
//             } else {
//                 return b.userName.localeCompare(a.userName);
//             }
//         });

//         setAllUsers(sortedUsers);
//         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     };

//     return (
//         <div>
//             <b>All Users</b>

//             {/* Drag and Drop Filters */}
//             <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <div style={{ marginRight: '20px' }}>
//                     <FilterItem name="userName" />
//                     <FilterItem name="email" />
//                     <FilterItem name="city" />
//                     <FilterItem name="state" />
//                 </div>
//                 <DropBox onDrop={handleDrop} />
//             </div>

//             {/* Search Input */}
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
//             />

//             {/* Display Selected Filters */}
//             <div style={{ marginBottom: '20px' }}>
//                 <b>Active Filters: </b>
//                 {selectedFilters.join(', ') || 'None'}
//             </div>

//             {/* Users Table */}
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Unique ID</th>
//                             <th>Picture</th>
//                             <th>
//                                 User Name
//                                 <button onClick={sortByUsername}>
//                                     {sortOrder === 'asc' ? '▲' : '▼'}
//                                 </button>
//                             </th>
//                             <th>Date of Birth</th>
//                             <th>Date Account Created</th>
//                             <th>Email</th>
//                             <th>City</th>
//                             <th>State</th>
//                             <th>Gender</th>
//                             <th>Password</th>
//                             <th>Interests</th>
//                             <th>Friends</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.map((user, index) => (
//                             <tr key={user.id} className={`admin-tablerow${index % 2}`}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     {user.profilePicture ? (
//                                         <img width="60px" src={user.profilePicture} alt="Profile" />
//                                     ) : (
//                                         <GoPerson size={60} />
//                                     )}
//                                 </td>
//                                 <td>
//                                     <a
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         href={`${process.env.REACT_APP_CLIENT_BASE_URL}/user/${user.userName}`}
//                                     >
//                                         {user.userName}
//                                     </a>
//                                 </td>
//                                 <td>{user.DateOfBirth}</td>
//                                 <td>{user.DateAccountCreated}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.city}</td>
//                                 <td>{user.state}</td>
//                                 <td>{user.gender}</td>
//                                 <td>{user.password}</td>
//                                 <td>
//                                     <ol>
//                                         {user.interests.map((interest) => (
//                                             <li key={interest}>{interest}</li>
//                                         ))}
//                                     </ol>
//                                 </td>
//                                 <td>
//                                     <p>Total friends = {user.friends ? user.friends.length : 0}</p>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// // Example components for FilterItem and DropBox (you can implement them as needed)
// function FilterItem({ name }) {
//     return <div draggable>{name}</div>;
// }

// function DropBox({ onDrop }) {
//     const handleDrop = (e) => {
//         e.preventDefault();
//         const filterName = e.dataTransfer.getData('text/plain');
//         onDrop(filterName);
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <div
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             style={{
//                 border: '2px dashed #ccc',
//                 padding: '20px',
//                 width: '300px',
//                 textAlign: 'center',
//             }}
//         >
//             Drop filters here
//         </div>
//     );
// }

// export default AdminAllUsers;



import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GoPerson } from 'react-icons/go';
import './OnlineUsers.css';

const FilterType = {
    FILTER_ITEM: 'filter_item',
};

const FilterItem = ({ name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: FilterType.FILTER_ITEM,
        item: { name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                marginBottom: '5px',
                padding: '10px',
                border: '1px solid black',
                borderRadius: '5px',
            }}
        >
            {name}
        </div>
    );
};

const DropBox = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: FilterType.FILTER_ITEM,
        drop: (item) => onDrop(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                border: '2px dashed black',
                padding: '20px',
                backgroundColor: isOver ? 'red' : 'green',
                minHeight: '100px',
            }}
        >
            Drag filters here
        </div>
    );
};

function AdminAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    async function getData() {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/getAllUsers`);
        data = await data.json();
        console.log(data);
        setAllUsers(data);
    } 

    useEffect(() => {
        getData();
    }, []);

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters for regex
    };

    const handleDrop = (filterName) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(filterName) ? prevFilters : [...prevFilters, filterName]
        );
    };

    const filteredUsers = allUsers.filter((user) => {
        const regex = new RegExp(escapeRegExp(searchTerm), 'i');
        return selectedFilters.some((filter) => regex.test(user[filter]));
    });

    return (
        <div>
            <b>All Users</b>

            {/* Drag and Drop Filters */}
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ marginRight: '20px' }}>
                    <FilterItem name="userName" />
                    <FilterItem name="email" />
                    <FilterItem name="city" />
                    <FilterItem name="state" />
                </div>
                <DropBox onDrop={handleDrop} />
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
            />

            {/* Display Selected Filters */}
            <div style={{ marginBottom: '20px' }}>
                <b>Active Filters: </b>
                {selectedFilters.join(', ') || 'None'}
            </div>

            {/* Users Table */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Unique ID</th>
                            <th>Picture</th>
                            <th>User Name</th>
                            <th>Date of Birth</th>
                            <th>Date Account Created</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Gender</th>
                            <th>Password</th>
                            <th>Interests</th>
                            <th>Friends</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.id} className={`admin-tablerow${index % 2}`}>
                                <td>{index + 1}</td>
                                <td>
                                    {user.profilePicture ? (
                                        <img width="60px" src={user.profilePicture} alt="Profile" />
                                    ) : (
                                        <GoPerson size={60} />
                                    )}
                                </td>
                                <td>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`${process.env.REACT_APP_CLIENT_BASE_URL}/user/${user.userName}`}
                                    >
                                        {user.userName}
                                    </a>
                                </td>
                                <td>{user.DateOfBirth}</td>
                                <td>{user.DateAccountCreated}</td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.gender}</td>
                                <td>{user.password}</td>
                                <td>
                                    <ol>
                                        {user.interests.map((interest) => (
                                            <li key={interest}>{interest}</li>
                                        ))}
                                    </ol>
                                </td>
                                <td>
                                    <p>Total friends = {user.friends ? user.friends.length : 0}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminAllUsers;
