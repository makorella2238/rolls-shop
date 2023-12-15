import Profile from "../../models/Profile.js";
import User from "../../models/User.js";

class ProfileController {
    async getProfile(req, res) {
        try {
            const user = await User.findOne({username: req.user.username})
            const _id = user._id
            const profile = await Profile.findOne({user: _id})
            res.send(profile);
        } catch (error) {
            console.error('Error getting profile:', error);
            res.status(500).send('Failed to get profile');
        }
    }

    async updateProfile(req, res) {
        try {
            const {firstName, lastName, phone, email} = req.body;
            const user = await User.findOne({username: req.user.username})
            const userId = user._id
            let profile = await Profile.findOne({user: userId})
            if (!profile) {
                profile = await new Profile({
                    user: userId,
                    firstName,
                    lastName,
                    phone,
                    email
                });

            } else {
                if (
                    profile.firstName === firstName &&
                    profile.lastName === lastName &&
                    profile.phone === phone &&
                    profile.email === email
                ) {
                    return res.status(400).send({message:'Данные профиля не изменились. Нет необходимости обновлять профиль.'});
                }

                profile.firstName = firstName;
                profile.lastName = lastName;
                profile.phone = phone;
                profile.email = email;
            }
            await profile.save();

            res.send(profile);

        } catch (error) {
            console.error('Error updateProfile profile:', error);
            res.status(500).send('Failed to update profile');
        }
    }

    async deleteProfile(req, res) {
        try {
            const user = await User.findOne({username: req.user.username})
            const _id = user._id
            const profile = await Profile.findOne({ user: _id });
            if (!profile) {
                return res.status(404).send('Profile not found');
            }
            await profile.deleteOne({user: _id})
            res.send({message: 'Profile deleted'});
        } catch (error) {
            console.error('Error deleting profile:', error);
            res.status(500).send('Failed to delete profile');
        }
    }
}

export default new ProfileController()