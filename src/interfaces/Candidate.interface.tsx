// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;
    avatar: string;
    username: string;
    location: string;
    email: string;
    company: string;
    bio: string;
}

export default Candidate;
