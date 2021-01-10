import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    TouchableOpacity


} from "react-native";
import * as quoteActions from '../../config/redux/action'
import { connect } from 'react-redux'

class Home extends Component {
    componentDidMount(){
        this.props.getDataNotes()
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.isLoading ?
                    <ActivityIndicator />
                    :
                    <View>
                        {
                           Object.keys(this.props.quote).map((key) => {
                                return(
                                <View key={key}>
                                  <Text >{this.props.quote[key].nama}</Text>
                                  <Text >{this.props.quote[key].nomorHp}</Text>
                                  <Text >{this.props.quote[key].alamat}</Text>
                                </View>
                                )
                            })
                        }
                    </View>
                }
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tambahData')}>
                        <Text>TAMBAH</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        quote: state.quote,
        isLoading: state.isLoading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataNotes: () => dispatch(quoteActions.getDataNotes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});