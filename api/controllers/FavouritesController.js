export const addFavourite = async (req, res) => {
  try {
    const accessToken = req.body.headers.authorization.split(" ")[1];
		const res = await axios.get(
			"https://dev-33fzkaw8.us.auth0.com/userinfo",
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		);
    const userInfo = res.data;
    
  } catch (e) {
    res.status(400).send({ data: e.message });
  }
}