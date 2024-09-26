import 'server-only'


export const addDomainToVercel = async (domain: string) => {
    return await fetch(
        `https://api.vercel.com/v10/projects/${process.env.PROJECT_ID_VERCEL
        }/domains${process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
        }`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: domain,
                // Optional: Redirect www. to root domain
                // ...(domain.startsWith("www.") && {
                //   redirect: domain.replace("www.", ""),
                // }),
            }),
        },
    ).then((res) => res.json());
};

export const removeDomainFromVercelProject = async (domain: string) => {
    return await fetch(
        `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL
        }/domains/${domain}${process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
        }`,
        {
            headers: {
                Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
            },
            method: "DELETE",
        },
    ).then((res) => res.json());
};

export const getDomainConfig = async (domain: string) => {
    return await fetch(`https://api.vercel.com/v6/domains/${domain}/config?strict=true&teamId=${process.env.TEAM_ID_VERCEL}`, {
        headers: {
            Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
        },
        method: "GET"
    })
}

export const getDomainFromVercel = async (domain: string) => {
    return await fetch(`https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}?teamId=${process.env.TEAM_ID_VERCEL}`, {
        headers: {
            Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
        },
        method: "GET"
    })
}

export const getDomainVerification = async (domain: string) => {
    return await fetch(`https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}/verify?teamId=${process.env.TEAM_ID_VERCEL}`, {
        headers: {
            Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
        },
        method: "POST"
    })
}
