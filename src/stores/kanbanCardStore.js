import axiosInstance from '@/api/axiosInstance';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKanbanCardStore = defineStore('kanbanCard', () => {
    const cards = ref([]);

    const loadAllCards = async (projectId) => {
        try {
            const response = await axiosInstance.get(`/api/projects/${projectId}/kanban-cards`); //
            cards.value = response.data.map((card) => ({
                id: card.kanbanCardId,
                columnId: card.kanbanColumnId,
                title: card.title,
                priority: card.priority,
                task_size: card.taskSize,
                members: [],
            }));
        } catch (error) {
            console.error('Failed to load cards:', error);
        }
    };

    const loadCardDetails = async (cardId) => {
        try {
            const response = await axiosInstance.get(`/api/kanban-cards/${cardId}/details`);
            const cardData = response.data;
            return {
                id: cardData.kanbanColumnInCard.kanbanCardId,
                columnId: cardData.kanbanColumnInCard.kanbanColumnId,
                columnName: cardData.kanbanColumnInCard.kanbanColumnName,
                title: cardData.kanbanColumnInCard.title,
                content: cardData.kanbanColumnInCard.content,
                priority: cardData.kanbanColumnInCard.priority,
                task_size: cardData.kanbanColumnInCard.taskSize,
                startAt: cardData.kanbanColumnInCard.startAt,
                endAt: cardData.kanbanColumnInCard.endAt,
                createdAt: cardData.kanbanColumnInCard.createdAt,

                members: cardData.cardMemberList.map((member) => ({
                    memberId: member.memberId,
                    nickName: member.nickName,
                    profileUrl: member.profileUrl,
                })),

                comments: cardData.cardCommentList || [],
            };
        } catch (error) {
            console.error('Failed to load card details:', error);
        }
    };

    const getCardsByColumnId = (columnId) => {
        return cards.value.filter((card) => card.columnId === columnId);
    };

    const updateKanbanCardTitle = async (cardId, updateColumn, updateData) => {
        try {
            // const form = {
            //     updateColumn: updateColumn,
            //     updateData: updateData,
            // };

            // const response = await axiosInstance.patch(`/api/kanban-cards/${cardId}`, form);

            console.log(cardId, updateColumn, updateData);

            const index = cards.value.findIndex((card) => card.id === cardId);
            console.log(cards.value[index]);

            console.log(index);

            // if (index !== -1) {
            //     cards.value[index] = {
            //         ...cards.value[index], // 기존 카드 데이터 유지
            //         ...(cards[index][updateColumn] = updateData),
            //     };
            // }

            console.log('변경', cards.value[index]);
        } catch (error) {
            console.error('Failed to load card details:', error);
        }
    };

    return { cards, loadAllCards, loadCardDetails, getCardsByColumnId, updateKanbanCardTitle };
});
