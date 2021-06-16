import React, { Component } from 'react';
import {
	View,
	Platform,
	KeyboardAvoidingView,
	StyleSheet,
	LogBox,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Google Firebase
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			uid: 0,
			user: {
				_id: '',
				name: '',
				avatar: '',
			},
		}

		// Connects to Firebase database
		const firebaseConfig = {
			apiKey: "AIzaSyC3HZvZ9sQTkSMkN2MSBsDRn2EVQ2H1CkA",
			authDomain: "chat-app-82d5d.firebaseapp.com",
			projectId: "chat-app-82d5d",
			storageBucket: "chat-app-82d5d.appspot.com",
			messagingSenderId: "921296711417",
			appId: "1:921296711417:web:ebf51852b118d02078bc28"
		};

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		this.referenceChatMessages = firebase.firestore().collection('messages');
		LogBox.ignoreLogs(['Setting a timer']);
	}

	// Sets state with a static message
	componentDidMount() {
		let { name } = this.props.route.params;

		this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				try {
					await firebase.auth().signInAnonymously();
			} catch (error) {
				console.error(error.message);
			}
		}		

			// Updates user state
			this.setState({
				uid: user.uid,
				user: {
					_id: user.uid,
					name: name,
					avatar: 'https://placeimg.com/140/140/any',
				},
				messages: [],
			});
			
			// Creates reference to active user's messages so user can see all messages
			this.referenceChatMessages = firebase.firestore().collection('messages');
			
			// Listens for collection changes for current user
			this.unsubscribeChatUser = this.referenceChatMessages
				.orderBy('createdAt', 'desc')
				.onSnapshot(this.onCollectionUpdate);
		});
	}

	componentWillUnmount() {
		// Stops listening for authentication
		this.unsubscribeChatUser();
		// Stops listening for changes
		this.authUnsubscribe();
	}

	// Updates messages state
	onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		// Iterates through each document
		querySnapshot.forEach((doc) => {
			let data = doc.data(); // Grabs QueryDocumentSnapshot's data
			messages.push({
				_id: data._id,
				text: data.text,
				createdAt: data.createdAt.toDate(),
				user: {
					_id: data.user._id,
					name: data.user.name,
					avatar: data.user.avatar,
				},
			});
		});
		this.setState({ messages });
	};

	// Adds messages to Firebase database
	addMessage() {
		const message = this.state.messages[0];
		this.referenceChatMessages.add({
			_id: message._id,
			uid: this.state.uid,
			createdAt: message.createdAt,
			text: message.text || null,
			user: message.user,
		});
	}

	// Event handler for when chat message is sent
	onSend(messages = []) {
		this.setState(
			(previousState) => ({
				messages: GiftedChat.append(previousState.messages, messages),
			}),
			() => {
				this.addMessage();
			});
	}

	// Chat bubble customization
	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#1982FC',
					},
				}}
			/>
		);
	}

	render() {
		const color = this.props.route.params.color; // Color selected on start page
		const styles = StyleSheet.create({
			container: {
				backgroundColor: color,
				flex: 1,
			},
		});

		const { name } = this.props.route.params;
		const { messages } = this.state;

		return (
			<View style={styles.container}>
				<GiftedChat
					renderBubble={this.renderBubble.bind(this)}
					messages={messages}
					onSend={(messages) => this.onSend(messages)}
					user={{
						_id: this.state.uid,
						avatar: 'https://placeimg.com/140/140/any',
						name: name,
					}}
				/>
				{Platform.OS === 'android' ? (
					<KeyboardAvoidingView behavior='height' />
				) : null}
			</View>
		);
	}
}
