import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
	render() {
		let name = this.props.route.params.name;
		let backgroundColor = this.props.route.params.backgroundColor;
		
		return (
			<View style={[styles.container, { backgroundColor: backgroundColor }]}>
				<Text style={styles.chatGreeting}>Hey there {name}! Time to chat.</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	chatGreeting: {
		color: 'white',
	},
});
