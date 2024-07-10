export interface PartnerDetails {
    thumbnailUrl: string;
    name: string;
    description: string;
    active: boolean;
}

export type PartnerData = Record<string, PartnerDetails>;

export interface UserDetails {
    username: string;
    password: string;
}

export type UserData = Record<string, UserDetails>;
