import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitMagazineStateType } from "types/MagazineList";
import { getDetailMagazineHandler, getMagazineHistoryHandler, getMagazineListHandler } from "utils/api/Magazine/MagazineListAPI";

const initState = {
    isLoading: false,
    isHistoryLoading: false,
    totalCount: 0,
    totalPages: 0,
    keyword: "",
    title: "",
    allDate: true,
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
    list: [],
    allChecked: false,
    checkList: [],
    isChecked: false,
    currentPage: 1,

    detailItem: {
        title: "",
        totalCommentCount: 0,
        hidden: false,
        id: 0,
        thumbnail: "",
        view: 0,
        contents: "",
        isScraped: false,
        isCounseling: false,
        createAt: "",
        updateAt: "",
        user: {
            id: 0,
            nickName: "",
            call: "",
            profileSrc: "",
        },
    },
    editHistory: [],
} as InitMagazineStateType;

interface MagazineListDataType {
    keyword: string;
    title: string;
    allDate: boolean;
    startDate: Date;
    endDate: Date;
    page: number;
}

// 매거진 리스트 조회하기
export const getMagazineList = createAsyncThunk("GET/getMagazineList", async (params: MagazineListDataType, thunkApi) => {
    try {
        const response = await getMagazineListHandler(params.keyword, params.title, params.allDate, params.startDate, params.endDate, params.page);
        console.log(response);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

interface getMagazineListDetailProps {
    brdSeq: string;
}

// 매거진 상세정보 조회하기
export const getMagazineDetail = createAsyncThunk("GET/getMagazineDetail", async (params: getMagazineListDetailProps, thunkApi) => {
    try {
        const response = await getDetailMagazineHandler(params.brdSeq);
        console.log(response);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const getMagazineHistory = createAsyncThunk("GET/getMagazineHistory", async (params: getMagazineListDetailProps, thunkApi) => {
    try {
        const response = await getMagazineHistoryHandler(params.brdSeq);
        console.log(response);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

const MagazineListSlice = createSlice({
    name: "MagazineListSlice",
    initialState: initState,
    reducers: {
        // 페이지 저장
        setMagazineListCurrentPage: (state, action) => {
            state.currentPage = action.payload.isPage;
        },
        // 검색 정보 저장
        setMagazineListSearchData: (state, action) => {
            state.keyword = action.payload.keyword;
            state.title = action.payload.title;
            state.allDate = action.payload.allDate;
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.currentPage = action.payload.page;
        },
        // 전체 체크
        setMagazineListAllChecked: (state, action) => {
            state.allChecked = action.payload.allChecked;
            if (action.payload.allChecked) {
                const checked: number[] = [];
                state.list.forEach((list) => {
                    checked.push(list.id);
                });
                state.checkList = checked;
            } else {
                state.checkList = [];
            }
        },
        // 각각 체크
        setMagazineListEachChecked: (state, action) => {
            if (action.payload.isChecked) {
                state.checkList = [...state.checkList, action.payload.brdSeq];
                const length = state.list.length;
                if (length === state.checkList.length) {
                    state.allChecked = true;
                }
            } else {
                state.checkList = state.checkList.filter((item) => item !== action.payload.brdSeq);
                state.allChecked = false;
            }
        },
        // 유저 리스트 업데이트
        setMagazineList: (state, action) => {
            state.list = action.payload.list;
        },
        // 체크리스트 수정
        setMagazineListCheckedList: (state, action) => {
            state.checkList = action.payload.checkList;
        },
        // 디테일 내용 업데이트
        setMagazineDetail: (state, action) => {
            state.detailItem.title = action.payload.title;
            state.detailItem.contents = action.payload.contents;
            state.detailItem.thumbnail = action.payload.thumbnail;
        },
    },
    extraReducers: (builder) => {
        builder
            // 매거진 리스트 조회
            .addCase(getMagazineList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getMagazineList.fulfilled, (state, action) => {
                if (action.payload?.status === 200) {
                    state.totalPages = action.payload.data.totalPages;
                    state.totalCount = action.payload.data.totalCounts;
                    state.list = [];
                    state.list = action.payload.data.list;
                    state.isLoading = false;
                } else {
                    return state;
                }
            })
            .addCase(getMagazineList.rejected, (state, action) => {
                state.isLoading = true;
            })
            // 매거진 상세 조회
            .addCase(getMagazineDetail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getMagazineDetail.fulfilled, (state, action) => {
                if (action.payload?.status === 200) {
                    state.detailItem = action.payload.data.data;
                    state.isLoading = false;
                }
            })
            .addCase(getMagazineDetail.rejected, (state, action) => {
                state.isLoading = true;
            })
            // 매거진 히스토리 조회
            .addCase(getMagazineHistory.pending, (state, action) => {
                state.isHistoryLoading = true;
            })
            .addCase(getMagazineHistory.fulfilled, (state, action) => {
                if (action.payload?.status === 200) {
                    state.isHistoryLoading = false;
                    state.editHistory = action.payload.data.history;
                }
            })
            .addCase(getMagazineHistory.rejected, (state, action) => {
                state.isHistoryLoading = true;
            });
    },
});

export const MagazineListAction = MagazineListSlice.actions;
export default MagazineListSlice.reducer;
