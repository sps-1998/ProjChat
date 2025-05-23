import bcrypt from 'bcrypt';

export interface User {
    id: string,
    username: string,
    passwordHash: string
}

export const users: User[] = [];  // users array holds all users in memory. This would be a DB in Prod.

export async function createUser(username: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 12);  // Salt-and-hashes all passwords with 12 rounds for security
    const user = {id: Date.now().toString(), username, passwordHash: hash};
    users.push(user); // Store the new user in the Users array
    return user; // Return user with created password hash
}

export async function validateUser(username: string, passwordHash: string): Promise<User | null> {
    const u = users.find((u) => u.username === username); // Look up user
    if (u && await bcrypt.compare(passwordHash, u.passwordHash)) return u; // Check raw password against hash
    return null; // Return a User object if they match, else null
}


