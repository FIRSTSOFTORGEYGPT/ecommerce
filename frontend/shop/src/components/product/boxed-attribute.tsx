import cn from 'classnames';

type BoxedAttributeProps = {
    title: string;
    value?: string;
    active?: boolean;
    className?: string;
    onClick?: () => void;
};

const BoxedAttribute: React.FC<BoxedAttributeProps> = ({
    title,
    value,
    active,
    className,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex cursor-pointer flex-col rounded border border-border-200 bg-gray-50 p-3 text-sm transition-colors',
                {
                    '!border-accent !bg-accent !text-light': active,
                },
                className
            )}
        >
            <span className="font-semibold text-heading">{title}</span>
            {value && <span className="text-body">{value}</span>}
        </div>
    );
};

export default BoxedAttribute;
