import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  state = {
    tasks: [{id: 1, task: "Go to the Market"}, {id: 2, task: "Finish school"}],
    text: ''
  }
  static navigationOptions = {
    header: null,
  };

  renderTasks = () => (this.state.tasks.map(task => (
    <Task 
    key={task.id}
    task={task}
    onDelete={this.deleteTask}
    onUpdate={this.updateTask}
    />
    )
  ))

  addTask = text =>{
    
    const tasks = [...this.state.tasks]
    const newTask = {id: tasks.length +1 , task: text }
    !tasks.filter(task =>(task.task === newTask.task))[0]  ? tasks.push(newTask) : Alert.alert("This task has already been added")
    
    this.setState({ tasks })
    
  }

  deleteTask = id =>{
    console.log("Delete Clicked >>>>")
    
    const tasks = [...this.state.tasks]
    const filteredTasks = tasks.filter(task =>(task.id !== id))
    this.setState({ tasks: filteredTasks })
    
  }

  updateTask = (id, text) =>{
    console.log("Update Clicked >>>>")
    
    const tasks = [...this.state.tasks]
    const task = tasks.filter(task =>(task.id === id))
    text.length !== 0 && !tasks.filter(task =>(task.task === text))[0] ? task.task = this.state.text && tasks.push(task) && console.log(text) : Alert.alert("No change made to task")
    
    this.setState({ tasks })
    
  }

  render() {
    console.log(">>>state>>", this.state)
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/yvkb.jpg')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />

            <Text style={styles.getStartedText}>
              React Native Task App
            </Text>

            <TextInput
              style={{height: 40, alignItems: "center", fontSize: 20}}
              placeholder="Add task here !"
              onChangeText={(text)=>(this.setState({text}))}
            />
            <Button
              onPress={()=>{this.addTask(this.state.text)}}
              title="Add Task"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          
          {this.renderTasks()}

          {/* <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  myContainer: {
    alignItems: 'center',
    padding: 5,
    fontSize: 25,
    // marginTop: 5,
    marginLeft: 15,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});


const Task = props => {
  return (
  // <View style={{padding:0.5}}>
  //   <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  //     <Text style={styles.myContainer}>
  //       {/* <MonoText style={styles.codeHighlightText}> */}
  //       {props.task.task}
  //       {/* </MonoText> */}
  //     </Text>
  //   </ScrollView>
  // </View>
  // <Touchable
  //   style={styles.option}
  //   background={Touchable.Ripple('#ccc', false)}
  //   onPress={this._handlePressDocs}>
  <ScrollView>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.optionIconContainer}>
        <Image
          source={require('../assets/images/yvkb.jpg')}
          resizeMode="contain"
          fadeDuration={0}
          style={{ width: 20, height: 20, marginTop: 1 }}
        />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionText}>
        {props.task.task}
        </Text>
      </View>
      <View>
      <Button 
      fontSize="15" 
      marginTop="1"
      title="Delete Task"
      color="#841584"
      onPress={()=>(props.onDelete(props.task.id))} />
      
      </View>
    <View>
    <Button 
    title="Update Task"
    color="#841584"
    onPress={()=>(props.onUpdate(props.task.id, props.updateText))} />
      

    </View>
    </View>
  </ScrollView>
  )
}