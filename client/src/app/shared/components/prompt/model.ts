export interface IModel {
    title?: string;
    content: string;
    show: boolean;
}

export interface IPromptProps extends IModel {
    onAgree: () => Promise<void>;
    onClose: () => void;
}

export interface IStateProps extends IModel, IPromptProps {
    agreed: boolean;
    onClickAgree: () => void;
}
