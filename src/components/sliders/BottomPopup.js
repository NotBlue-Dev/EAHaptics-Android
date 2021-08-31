import React from 'react';
import { View, Text, Modal, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';

const deviceHeight = Dimensions.get('window').height

export class BottomPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show:false
        }
    }

    show = () => {
        this.setState({show:true})
    }
    
    close = () => {
        this.setState({show:false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex:1,width:'100%'}}/>
        if(!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return (
            <View>
                <Text style={{
                    color:'orange',
                    fontSize :15,
                    fontWeight:'500',
                    margin:15
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return (
            <View>
                <FlatList
                style={{marginBottom: 20}}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={this.renderItem}
                extraData={data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                contentContainerStyle={{
                    paddingBottom:40
                }}
                />

            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style = {{
                    opacity:0.1,
                    backgroundColor:'black',
                    height:3
                }}
            />
        )
    }

    render() {
        let {show} = this.state
        const {onTouchOutside, title} = this.props

        return(
            <Modal
            animationType={'slide'}
            transparent={true}
            visible={show}
            onRequestClose={this.close}
            >
                <View style={{flex:1, backgroundColor:'#FFFFF00000', justifyContent:'flex-end'}}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor:'#3C4250',
                        width:'100%',
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        paddingHorizontal:10,
                        height:"100%",
                        maxHeight:deviceHeight *0.6
                    }}>

                    {this.renderTitle()}
                    {this.renderContent()}
                    </View>
                </View>
            </Modal>
            
        )
    }
}