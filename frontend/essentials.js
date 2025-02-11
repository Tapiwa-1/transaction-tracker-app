const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const StackNavigator = () => (

    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'dodgerblue'
        }
    }}>
        <Stack.Screen name='Tweets' component={Tweets} />
        <Stack.Screen name='TweetDetails' component={TweetDetails} options={{
            headerStyle: { backgroundColor: 'tomato' }
        }} />
    </Stack.Navigator>

)
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions=
        {
            {
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "black",
                tabBarActiveBackgroundColor: "tomato",
                tabBarInactiveBackgroundColor: "#eee",
                tabBarStyle: [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }
        }
    >
        <Tab.Screen name='Feed' component={StackNavigator} options={{
            tabBarIcon: ({ size, color }) => <MaterialIcon name={'home'} size={size} color={color} />
        }} />
        <Tab.Screen name='Account' component={Account} options={{
            tabBarIcon: ({ size, color }) => <MaterialIcon name={'account'} size={size} color={color} />
        }} />
    </Tab.Navigator>
)

const Account = () => (<Screen><Text>Account</Text></Screen>)
const Link = () => {
    const navigation = useNavigation()
    return (
        <Button title='Click' onPress={() => navigation.navigate('TweetDetails', { id: 1 })} />)
}
const Tweets = ({ navigation }) => (
    <Screen>
        <Text>Tweets</Text>
        <Link />
    </Screen>
)

const TweetDetails = ({ navigation, route }) => (
    <Screen>
        <Text>TweetDetails {route.params.id}</Text>
        <Button title='View TweetDetails' onPress={() => navigation.navigate('Tweets')} />
    </Screen>
)