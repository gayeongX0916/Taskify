type validateFieldsProps = {
  fields: "email" | "nickname" | "password" | "checkPassword";
  value: string;
  values?: Record<string, string>;
};

export function validateFields({ fields, value, values }: validateFieldsProps) {
  switch (fields) {
    case "email": {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return "이메일을 입력해 주세요.";
      if (!emailRegex.test(value)) return "이메일 형식으로 작성해 주세요.";
      return "";
    }
    case "nickname": {
      if (!value) return "닉네임을 입력해 주세요.";
      if (value.length > 10) return "10자 이하로 작성해 주세요.";
      return "";
    }
    case "password": {
      if (!value) return "비밀번호를 입력해 주세요.";
      if (value.length < 8) return "8자 이상 입력해 주세요.";
      return "";
    }
    case "checkPassword": {
      if (!value) return "비밀번호를 입력해 주세요.";
      if (value !== values?.password) return "비밀번호가 일치하지 않습니다.";
      return "";
    }
  }
}
