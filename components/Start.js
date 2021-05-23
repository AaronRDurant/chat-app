import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			backgroundColor: '',
			buttonPressed: false,
		};
	}
	
	render() {
		const image = require('../assets/background-image.png');
		
		return (
			<ImageBackground source={image} style={styles.backgroundImage}>
				<View style={styles.container}>
					<View style={styles.appTitleContainer}>
						<Text style={styles.appTitle}>The Chat App</Text>
					</View>
					
					<View style={styles.userContainer}>
						<TextInput
							style={styles.textInput}
							onChangeText={(name) => this.setState({ name })}
							value={this.state.name}
							placeholder='Enter your name...'
						/>
						<Text style={styles.usernameText}>{this.state.name}</Text>
						
						<View style={styles.colorContainer}>
							<Text style={styles.colorTitle}>Choose a background:</Text>
							<View style={styles.colorOptions}>
								<TouchableOpacity
									onPress={() => this.setState({ backgroundColor: '#090C08', buttonPressed: true })}
									style={styles.colorOne}>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.setState({ backgroundColor: '#474056' })}
									style={styles.colorTwo}>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.setState({ backgroundColor: '#8A95A5' })}
									style={styles.colorThree}>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.setState({ backgroundColor: '#B9C6AE' })}
									style={styles.colorFour}>
								</TouchableOpacity>
							</View>
						</View>
						
						<View style={styles.chatButton}>
							<Button
								style={styles.chatButtonText}
								title='Start chatting!'
								color='white'
								onPress={() => this.props.navigation.navigate('Chat',
								{
									name: this.state.name,
									backgroundColor: this.state.backgroundColor
								})}
							/>
						</View>
					</View>
				</View>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
	},
	appTitleContainer: {
		width: '88%',
		height: '56%'
	},
	appTitle: {
		position: 'relative',
		textAlign: 'center',
		margin: 20,
		marginRight: 'auto',
		marginLeft: 'auto',
		color: '#FFFFFF',
		top: 100,
		height: '44%',
		fontSize: 45,
		fontWeight: '600',
	},
	userContainer: {
		width: '88%',
		height: '44%',
		backgroundColor: 'white',
		padding: 'auto',
		borderRadius: 5,
	},
	textInput: {
		borderColor: 'gray',
		color: '#757083',
		borderWidth: 1,
		fontSize: 16,
		fontWeight: '300',
		opacity: 50,
		position: 'relative',
		padding: 5,
		margin: 20,
	},
	usernameText: {
		fontSize: 16,
		fontWeight: '600',
		marginLeft: 20,
	},
	colorContainer: {
		margin: 20
	},
	colorTitle: {
		fontSize: 16,
		fontWeight: '300',
		color: '#757083',
		opacity: 100
	},
	colorOptions: {
		flexDirection: 'row',
		marginRight: 5,
		position: 'relative'
	},
	colorOne: {
		backgroundColor: '#090C08',
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: 10
	},
	colorTwo: {
		backgroundColor: '#474056',
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: 10
	},
	colorThree: {
		backgroundColor: '#8A95A5',
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: 10
	},
	colorFour: {
		backgroundColor: '#B9C6AE',
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: 10
	},
	chatButton: {
		backgroundColor: '#000e00',
		marginHorizontal: 90
	},
	chatButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: 'white',
	},
});
