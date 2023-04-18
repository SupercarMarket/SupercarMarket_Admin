import React, { useState, useEffect, useRef } from "react";
import {
    Wrapper,
    Table,
    TableHeader,
    TableContent,
    TableWrapper,
    CompleteButton,
    CompleteButtonWrapper,
    Input,
    RadioBtnWrapper,
    RadioBtnLabel,
    SelecterWrapper,
    Selecter,
    SelecterArrow,
    OptionWrapper,
    OptionItem,
    FileLabel,
    FileNameWrapper,
} from "./BannerUpdateForm.styled";

import ClientAxios from "utils/api/AxiosAPI/ClientAxios";
import PageTitle from "components/Common/PageTitle/PageTitle";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDetectOutSideHandler } from "hooks/DropDown/useDropDownHooks";
import { DropDownItemMap } from "types/DropDownType";
const BannerUpdateForm = () => {
    const { id } = useParams();
    const titleRef = useRef<HTMLSpanElement>(null);
    const fileRef = useRef(null);
    const { isOpen, isTitle, ref, openDropDownFn, changeDropDownTitleFn } =
        useDetectOutSideHandler({
            initState: false,
            title: "banner_order_list",
        });
    const [data, setData] = useState<any>();
    const [title, setTitle] = useState<string>();
    const [type, setType] = useState<string>();
    const [url, setUrl] = useState<string>();
    const [order, setOrder] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState();
    const [fileUrl, setFileUrl] = useState<string>();
    const [file, setFile] = useState<any>();
    const [updated, setUpdated] = useState<boolean>(false);
    useEffect(() => {
        getData();
    }, [updated]);
    const getData = async () => {
        setLoading(true);
        const response = await ClientAxios.get(`banner/${id}`);
        console.log("getData", response.data);
        setData(response.data.data);
        setTitle(response.data.data.title);
        setType(response.data.data.type);
        setUrl(response.data.data.url);
        setOrder(response.data.data.order);
        setFileUrl(response.data.data.image_url);
        setFileName(response.data.data.image_name);
        changeDropDownTitleFn(response.data.data.order);
        setLoading(false);
    };
    const LiOnClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setOrder(event.currentTarget.textContent as string);
    };
    const update = async () => {
        const formData = new FormData();
        const requestDto = {
            order: order,
            title: title,
            type: type,
            url: url,
        };
        
        formData.append("image", file);
        const blob = new Blob([JSON.stringify(requestDto)], { type: "application/json" });
        formData.append("requestDto", blob);
        console.log(formData);
        await ClientAxios.post(`banner/${id}`, formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        });
        setUpdated((prev) => !prev);
    };
    const changeFile = (event: any) => {
        console.log(event.target.files);
        setFile(event.target.files[0]);
        setFileUrl(URL.createObjectURL(event.target.files[0]));
        setFileName(event.target.files[0].name);
    };
    return (
        <>
            <Wrapper>
                <TableWrapper>
                    <PageTitle title={"배너 수정"} />
                    {loading ? (
                        <>로딩중입니다..</>
                    ) : (
                        <Table>
                            <tbody>
                                <tr>
                                    <TableHeader>배너명</TableHeader>
                                    <TableContent>
                                        <Input
                                            value={title}
                                            onChange={(event) =>
                                                setTitle(event.target.value)
                                            }
                                        ></Input>
                                    </TableContent>
                                </tr>
                                <tr>
                                    <TableHeader>버전</TableHeader>
                                    <TableContent>
                                        <RadioBtnWrapper>
                                            <RadioBtnLabel>
                                                <input
                                                    type="radio"
                                                    value={type}
                                                    checked={type === "PC"}
                                                    name="PC"
                                                    onChange={(event) =>
                                                        setType(
                                                            event.target.name
                                                        )
                                                    }
                                                />
                                                <span>PC</span>
                                            </RadioBtnLabel>

                                            <RadioBtnLabel>
                                                <input
                                                    type="radio"
                                                    value={type}
                                                    checked={type === "모바일"}
                                                    name="모바일"
                                                    onChange={(event) =>
                                                        setType(
                                                            event.target.name
                                                        )
                                                    }
                                                />
                                                <span>모바일</span>
                                            </RadioBtnLabel>
                                        </RadioBtnWrapper>
                                    </TableContent>
                                </tr>
                                <tr>
                                    <TableHeader>URL</TableHeader>
                                    <TableContent>
                                        <Input
                                            value={url}
                                            onChange={(event) =>
                                                setUrl(event.target.value)
                                            }
                                        ></Input>
                                    </TableContent>
                                </tr>
                                <tr>
                                    <TableHeader>이미지</TableHeader>
                                    <TableContent>
                                        <FileLabel htmlFor="file_banner">
                                            파일 추가 +
                                        </FileLabel>
                                        <input
                                            type="file"
                                            id="file_banner"
                                            style={{ display: "none" }}
                                            onChange={changeFile}
                                        />
                                        <br />
                                        <Link
                                            to={fileUrl as string}
                                            target="blank"
                                        >
                                            <FileNameWrapper>
                                                파일 {fileName}
                                            </FileNameWrapper>
                                        </Link>
                                        <div
                                            style={{
                                                padding: "5px",
                                                color: "grey",
                                            }}
                                        >
                                            PC : 3840px * 1200px
                                        </div>
                                        <div
                                            style={{
                                                padding: "5px",
                                                color: "grey",
                                            }}
                                        >
                                            모바일 : 750px * 320px
                                        </div>
                                    </TableContent>
                                </tr>
                                <tr>
                                    <TableHeader>순번</TableHeader>
                                    <TableContent>
                                        <SelecterWrapper ref={ref}>
                                            <Selecter
                                                onClick={() =>
                                                    openDropDownFn(isOpen)
                                                }
                                            >
                                                <span ref={titleRef}>
                                                    {isTitle}
                                                </span>
                                            </Selecter>
                                            <SelecterArrow />
                                            <OptionWrapper isClicked={isOpen}>
                                                {DropDownItemMap[
                                                    "banner_order_list"
                                                ].map((item) => {
                                                    return (
                                                        <OptionItem
                                                            key={item.name}
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                changeDropDownTitleFn(
                                                                    item.name
                                                                );
                                                                LiOnClick(
                                                                    event
                                                                );
                                                            }}
                                                        >
                                                            {item.name}
                                                        </OptionItem>
                                                    );
                                                })}
                                            </OptionWrapper>
                                        </SelecterWrapper>
                                    </TableContent>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </TableWrapper>
                <CompleteButtonWrapper>
                    <CompleteButton onClick={update}>수정하기</CompleteButton>
                </CompleteButtonWrapper>
            </Wrapper>
        </>
    );
};

export default BannerUpdateForm;
