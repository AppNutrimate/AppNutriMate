import AsyncStorage from "@react-native-async-storage/async-storage"
import dailyTips from "src/constants/dailyTips"

const dailyTipsService = {
    getDailyTip: async () => {
        const today = new Date().toISOString().split('T')[0]
        const storedTip = await AsyncStorage.getItem('dailyTip')
        const storedDate = await AsyncStorage.getItem('tipDate')

        if (storedTip && storedDate === today) {
            return storedTip
        }

        const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)]

        await AsyncStorage.setItem('dailyTip', randomTip)
        await AsyncStorage.setItem('tipDate', today)

        return randomTip
    }
}
export default dailyTipsService;