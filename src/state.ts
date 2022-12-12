import {v1} from 'uuid';
import {ActionType, StoreType} from './types';

export const store: StoreType = {
    _state: {
        profilePage: {
            avatarData: [{
                id: v1(),
                src: 'https://klike.net/uploads/posts/2019-03/medium/1551511784_4.jpg',
                name: 'Anita',
                age: '34',
                zodiac: 'Libra',
                professional: 'Front-end Developer',
            },],
            postData: [
                {
                    id: v1(),
                    src: 'https://vibir.ru/wp-content/uploads/2019/10/avatarka-dlya-zhenshhin-glavnye-pravila-vybora.jpg',
                    description: 'Hi!',
                    countLike: 15,
                    countDislike: 1,
                },
                {
                    id: v1(),
                    src: 'https://vibir.ru/wp-content/uploads/2019/10/avatarka-dlya-zhenshhin-glavnye-pravila-vybora.jpg',
                    description: 'How are you?', countLike: 10, countDislike: 0,
                },
                {
                    id: v1(),
                    src: 'https://vibir.ru/wp-content/uploads/2019/10/avatarka-dlya-zhenshhin-glavnye-pravila-vybora.jpg',
                    description: 'I\'m OK, and you?', countLike: 5, countDislike: 0,
                },
            ],
            messageForNewPost: ''
        },
        messagePage: {
            dialogsData: [
                {id: v1(), src: 'https://klike.net/uploads/posts/2019-03/medium/1551511784_4.jpg', message: 'Hi!'},
                {id: v1(), src: 'https://klike.net/uploads/posts/2019-03/1551511808_5.jpg', message: 'Hi'},
                {
                    id: v1(),
                    src: 'https://klike.net/uploads/posts/2019-03/medium/1551511784_4.jpg',
                    message: 'I love you'
                },
                {id: v1(), src: 'https://klike.net/uploads/posts/2019-03/1551511808_5.jpg', message: 'Me too'},
            ],
            correspondentData: [
                {id: v1(), name: 'Anna', src: 'https://klike.net/uploads/posts/2019-03/1551511823_2.jpg'},
                {id: v1(), name: 'Dima', src: 'https://klike.net/uploads/posts/2019-03/1551515594_15.jpg'},
                {id: v1(), name: 'Milana', src: 'https://klike.net/uploads/posts/2019-03/1551511808_5.jpg'},
                {id: v1(), name: 'Diana', src: 'https://klike.net/uploads/posts/2019-03/medium/1551511866_11.jpg'},
                {id: v1(), name: 'Alex', src: 'https://klike.net/uploads/posts/2019-03/1551511862_19.jpg'},
                {id: v1(), name: 'Esmi', src: 'https://klike.net/uploads/posts/2019-03/medium/1551511789_7.jpg'},
            ],
            messageForNewDialog: ''
        }
    },
    _callSubscribe () {
        console.log('state had rerender')
    },
    getState () {
        return this._state
    },
    subscribe (observer: () => void) {
        this._callSubscribe = observer
    },
    dispatch (action: ActionType) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: v1(),
                src: 'https://vibir.ru/wp-content/uploads/2019/10/avatarka-dlya-zhenshhin-glavnye-pravila-vybora.jpg',
                description: this.getState().profilePage.messageForNewPost,
                countLike: 0,
                countDislike: 0,
            }
            this.getState().profilePage.postData.unshift(newPost)
            this.dispatch({type: 'CHANGE-POST', newMessageForNewPost: ''})
            this._callSubscribe()
        } else if (action.type === 'CHANGE-POST') {
            this.getState().profilePage.messageForNewPost = action.newMessageForNewPost
            this._callSubscribe()
        } else { // @ts-ignore
            if (action.type === 'ADD-MESSAGE') {
                const newMessage = {
                    id: v1(),
                    src: 'https://klike.net/uploads/posts/2019-03/medium/1551511784_4.jpg',
                    message: action.newDialogs
                }
                this.getState().messagePage.dialogsData.push(newMessage)
                this.dispatch({type: 'CHANGE-MESSAGE', newMessageForNewDialog: ''})
                this._callSubscribe()
            } else if (action.type === 'CHANGE-MESSAGE') {
                this.getState().messagePage.messageForNewDialog = action.newMessageForNewDialog
                this._callSubscribe()
            } else {
                this.getState()
            }
        }
    },
}

