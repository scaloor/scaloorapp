
import { getAuthUserDetails } from "@/server/actions/users";


export default async function Account() {
  const user = await getAuthUserDetails();
  return (
    <div>
      Account
      <h2>Super Secret Stuff</h2>
      <p>{JSON.stringify(user)}</p>
    </div>
  )
}