import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';
import { observer, inject } from "mobx-react";
import {NavigationActions, StackActions} from "react-navigation";

@inject('rootStore')
@observer
export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMode: false,
      zoom: 0.2
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <QRscanner onRead={this.onRead} renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={50}/>
      </View>
    );
  }
  bottomView = ()=>{
    return(
    <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
      <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
        <Text style={{color:'#fff'}}>点我开启/关闭手电筒</Text>
      </TouchableOpacity>
    </View>
    );
  }
  onRead = (res) => {
    if(this.props.rootStore.stateStore.tocamera==0){
        alert('0')
        //Assets界面进来的
        this.props.rootStore.stateStore.iscamera=1
        this.props.rootStore.stateStore.t_address=res.data
        let resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Transfer'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    if(this.props.rootStore.stateStore.tocamera==1){
        alert('1')
        //transfer界面进来的
        this.props.rootStore.stateStore.iscamera=1
        this.props.rootStore.stateStore.t_address=res.data
        this.props.navigation.navigate('Transfer')
    }
    if(this.props.rootStore.stateStore.tocamera==2){
        alert('2')
        //通讯录界面进来的
        this.props.rootStore.stateStore.iscamera=1
        this.props.rootStore.stateStore.QRaddress=res.data
        this.props.navigation.navigate('Add_address')
    }
    // alert(res.data);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});