import React from 'react';
import { View, Text, Modal, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Colors,Typo } from '../../styles/index';

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
    
    //#BUG# refresh ne refresh pas
    refresh = () => {
        this.saveAnnotations();
        this.forceUpdate();
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
                    marginLeft:25,
                    marginTop:35,
                    marginBottom:25,
                    color:Colors.WHITE,
                    fontSize :Typo.FONT_SIZE_TEXT,
                    fontWeight:Typo.FONT_WEIGHT_REGULAR,
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return (
            <View style={{marginLeft:25,marginRight:25}}>
                {this.renderSeparator()}
                <FlatList
                style={{marginBottom: 20}}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={this.renderItem}
                extraData={data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                contentContainerStyle={{

                }}
                />

            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View>
                <Text
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        color:Colors.WHITE,
                        fontSize :Typo.FONT_SIZE_TEXT,
                        fontWeight:Typo.FONT_WEIGHT_REGULAR,
                    }}>
                - {item.name} {item.battery}% type:{item.type}, {item.paired}, Status:{item.status}
                </Text>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style = {{
                    opacity:1,
                    backgroundColor:Colors.WHITE,
                    height:0.5,
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
                        backgroundColor:Colors.GRAY_LIGHT,
                        width:'100%',
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
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